import { withNativeFederation } from '@angular-architects/native-federation/config.js';
import { FederationConfig } from '@softarc/native-federation/src/lib/config/federation-config';
import { parseFromProject, AnalyserOptions, ClassNode, Declaration, DeclarationNode, DecoratorNode, ModuleNode } from '@ts-ast-parser/core';
import { Node } from 'typescript';
export async function getConfigFromProject(options?: Partial<AnalyserOptions>) {
  const { project } = await parseFromProject(options);

  const federatedClasses = project
    ?.getModules()
    ?.map((mn: ModuleNode) => mn?.getDeclarations())
    ?.flat()
    ?.filter(
      (md: DeclarationNode<Declaration, Node>) =>
        md?.getKind() === 'Class' &&
        (md as ClassNode)
          ?.getDecorators()
          ?.some((d: DecoratorNode) =>
            [
              'withNativeFederationDynamicHost',
              'withNativeFederationRemote',
            ].includes(d?.getName())
          )
    );

  if(!federatedClasses?.length) {
    throw Error('No native federation modules found in project. Please add withNativeFederationDynamicHost or withNativeFederationRemote decorator to on one of project\'s object (ie AppComponent).');
  }
  if(federatedClasses?.length > 1) {
    throw Error('Multiple native federation modules found in project. Please make sure only one project object is decorated with withNativeFederationDynamicHost or withNativeFederationRemote. Alternativly, extend config.expose or create a new host/remote.');
  }

  const federatedClass = federatedClasses?.[0];
  const config: FederationConfig =
    (federatedClass as ClassNode)
      ?.getDecorators()
      ?.find((d: DecoratorNode) =>
        [
          'withNativeFederationDynamicHost',
          'withNativeFederationRemote',
        ].includes(d?.getName())
      )
      ?.getArguments()
      ?.map((a: unknown) => new Function('return ' + a + ';')())
      ?.map((config: any) => {
        const entryFileName = federatedClass.getTSNode()?.getSourceFile()?.fileName;
        const entry = entryFileName ? {'./Entry': entryFileName} : {};
        const exposes = {...config.exposes, ...entry};
        return {...config, exposes};
      })
      ?.[0] ?? {};

  return withNativeFederation(config);
};
