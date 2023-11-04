module.exports = (async function () {
  const {
    withNativeFederation,
  } = require('@angular-architects/native-federation/config');
  const { parseFromProject } = await import('@ts-ast-parser/core');

  const { errors, project } = await parseFromProject({
    tsConfigFilePath: __dirname + '/tsconfig.app.json',
  });

  const federatedClasses = project
    ?.getModules()
    ?.map((m) => m?.getDeclarations())
    ?.flat()
    ?.filter(
      (md) =>
        md?.getKind() === 'Class' &&
        md
          ?.getDecorators()
          ?.some((d) =>
            [
              'withNativeFederationDynamicHost',
              'withNativeFederationRemote',
            ].includes(d?.getName())
          )
    );

  const federatedClass = federatedClasses?.[0];
  const federatedArgs =
    federatedClass
      ?.getDecorators()
      ?.find((d) =>
        [
          'withNativeFederationDynamicHost',
          'withNativeFederationRemote',
        ].includes(d?.getName())
      )
      ?.getArguments()
      ?.map((a) => new Function('return ' + a + ';')()) ?? [];

  return withNativeFederation(...federatedArgs);
})();
