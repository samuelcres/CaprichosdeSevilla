# Guía de Despliegue - Caprichos de Sevilla

Esta aplicación soporta dos modos de despliegue diferentes para adaptarse a tus necesidades.

## Modo 1: Multi-Apartamento (Por Defecto)

Este es el modo predeterminado. La aplicación muestra una pantalla de selección donde los usuarios eligen entre:
- Capricho de Ibarra
- Capricho de Quevedo

**Configuración:** No requiere configuración adicional. Simplemente despliega la aplicación tal cual.

## Modo 2: Apartamento Único

Crea una aplicación dedicada exclusivamente a un solo apartamento. Útil si deseas:
- Tener dos URLs diferentes, una para cada apartamento
- Simplificar la experiencia del usuario eliminando la selección
- Personalizar cada despliegue de manera independiente

### Configuración

1. **Para Capricho de Ibarra:**
   - Configura la variable de entorno: `VITE_APARTMENT=ibarra`
   - La app saltará directamente al menú de Ibarra
   - Solo se mostrará información de Ibarra

2. **Para Capricho de Quevedo:**
   - Configura la variable de entorno: `VITE_APARTMENT=quevedo`
   - La app saltará directamente al menú de Quevedo
   - Solo se mostrará información de Quevedo

### Diferencias en Modo Apartamento Único

Cuando se configura `VITE_APARTMENT`:
- ✅ No se muestra la pantalla de selección de apartamento
- ✅ La app inicia directamente en el menú del apartamento configurado
- ✅ El botón "Volver" está oculto (no hay selección a la que volver)
- ✅ Solo se muestra información relevante al apartamento seleccionado

### Ejemplo de Despliegues Múltiples en Replit

1. **Despliegue para Ibarra:**
   - Nombre: "Capricho de Ibarra - Guest App"
   - Variable de entorno: `VITE_APARTMENT=ibarra`
   - URL: https://capricho-ibarra.replit.app (ejemplo)

2. **Despliegue para Quevedo:**
   - Nombre: "Capricho de Quevedo - Guest App"
   - Variable de entorno: `VITE_APARTMENT=quevedo`
   - URL: https://capricho-quevedo.replit.app (ejemplo)

## Variables de Entorno

Consulta `.env.example` para ver todas las variables disponibles.

### VITE_APARTMENT

- **Tipo:** String (opcional)
- **Valores válidos:** `ibarra` | `quevedo`
- **Por defecto:** No configurado (modo multi-apartamento)
- **Descripción:** Pre-configura la aplicación para un apartamento específico

## Publicación

Una vez configurado el modo deseado, puedes publicar tu aplicación:
1. Asegúrate de que la variable `VITE_APARTMENT` esté configurada correctamente (si aplica)
2. Haz clic en el botón "Publish" en Replit
3. La aplicación se desplegará con la configuración seleccionada
