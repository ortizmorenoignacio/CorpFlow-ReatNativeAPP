import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";

//Creamos el contexto
const AuthContext = createContext();

//Creamos el Provider que envuelve la APP

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //Datos del usuario
  const [token, setToken] = useState(null); //Token
  const [loading, setLoading] = useState(true);

  //Comprobamos si hay una sesion guardada

  useEffect(() => {
    const loadSession = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem("user");
        const tokenGuardado = await AsyncStorage.getItem("token");
        const fechaExpiracion = await AsyncStorage.getItem("expiracion");
        if (usuarioGuardado && tokenGuardado && fechaExpiracion) {
          const ahoraMismo = new Date();
          const limite = new Date(fechaExpiracion);
          if (ahoraMismo > limite) {
            console.log("La sesión ha expirado");

            await AsyncStorage.multiRemove(["user", "token", "expiracion"]);
          } else {
            setUser(JSON.parse(usuarioGuardado));
            setToken(tokenGuardado);
          }
        }
      } catch (error) {
        console.error("Error cargando sesion", error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  //INICIO de SESIÓN

  const signIn = async (userData, userToken) => {
    try {
      //Guardamos los estados
      setUser(userData);
      setToken(userToken);

      //Calculamos la fecha de caducidad
      const fechaCaducidad = new Date();
      fechaCaducidad.setHours(fechaCaducidad.getHours() + 2);
      // Guardamos en el movil (PERSISTENCIA)

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", userToken);
      await AsyncStorage.setItem("expiracion", fechaCaducidad.toISOString());
    } catch (error) {
      console.error("Error guardando sesion", error);
    }
  };

  //CIERRE de SESIÓN

  const signOut = async () => {
    try {
      //Borramos el estado
      setUser(null);
      setToken(null);

      //Borramos del movil

      await AsyncStorage.multiRemove(["user", "token", "expiracion"]);
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
