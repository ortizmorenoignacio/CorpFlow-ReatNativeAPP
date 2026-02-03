// https://docs.expo.dev/guides/using-eslint/

const expo = require("eslint-config-expo/flat");
const prettier = require("eslint-plugin-prettier/recommended");

module.exports = [
  // 1. Extendemos la configuración plana de Expo
  ...expo,

  // 2. Añadimos la configuración recomendada de Prettier
  // (Esto activa el plugin y desactiva reglas de ESLint que chocan con Prettier)
  prettier,

  // 3. Tus reglas personalizadas van en un objeto aparte al final
  {
    rules: {
      // Aquí puedes forzar que prettier marque error si algo está mal
      "prettier/prettier": "error",
    },
  },
];
