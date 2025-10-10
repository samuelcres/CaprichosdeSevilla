# Guía de Despliegue en Cloudflare Pages

Esta guía te ayudará a desplegar tu aplicación web **Caprichos de Sevilla** en Cloudflare Pages de forma **100% GRATUITA** y permanente.

## ✨ Ventajas de Cloudflare Pages

- ✅ **Completamente GRATIS** (sin límite de tiempo)
- ✅ **Sin necesidad de suscripción mensual**
- ✅ **Despliegue automático** desde GitHub
- ✅ **SSL/HTTPS gratis** incluido
- ✅ **CDN global** para máxima velocidad
- ✅ **Dominio personalizado** gratuito (opcional)

---

## 📋 Requisitos Previos

Antes de comenzar, necesitas:

1. **Cuenta de GitHub** (gratis) → [Crear cuenta](https://github.com/join)
2. **Cuenta de Cloudflare** (gratis) → [Crear cuenta](https://dash.cloudflare.com/sign-up)

---

## 🚀 Paso 1: Descargar el Proyecto desde Replit

1. En Replit, haz clic en el menú de tres puntos (⋮) en la parte superior izquierda
2. Selecciona **"Download as zip"**
3. Guarda el archivo en tu computadora
4. Extrae el archivo ZIP en una carpeta
5. Abre una terminal en esa carpeta

---

## 🔧 Paso 2: Limpiar el Proyecto (Importante)

Antes de subir a GitHub, elimina archivos innecesarios para Cloudflare:

### Archivos/Carpetas a ELIMINAR:
```bash
# Elimina estos archivos/carpetas:
rm -rf server/          # El servidor no se necesita (la app es 100% frontend)
rm -rf node_modules/    # Se reinstalarán automáticamente
rm -rf dist/            # Se generará automáticamente
rm .replit              # Configuración específica de Replit
```

### Archivos a MANTENER:
- ✅ `client/` (todo el frontend)
- ✅ `attached_assets/` (imágenes y recursos)
- ✅ `shared/` (tipos compartidos si existen)
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `tailwind.config.ts`
- ✅ `tsconfig.json`
- ✅ `.gitignore`
- ✅ `.env.example`
- ✅ Archivos de documentación (*.md)

---

## 📤 Paso 3: Subir a GitHub

### 3.1 Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com/new)
2. Pon un nombre: `caprichos-de-sevilla`
3. Déjalo **Público** (o Privado si prefieres)
4. **NO** marques "Add README" (ya tienes archivos)
5. Haz clic en **"Create repository"**

### 3.2 Subir el Código
En tu terminal (dentro de la carpeta del proyecto):

```bash
# Inicializar Git (si no está ya)
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Caprichos de Sevilla"

# Renombrar la rama a main
git branch -M main

# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/caprichos-de-sevilla.git

# Subir el código
git push -u origin main
```

> **Nota:** Si te pide credenciales, usa tu nombre de usuario de GitHub y un [Personal Access Token](https://github.com/settings/tokens) como contraseña.

---

## ☁️ Paso 4: Configurar Cloudflare Pages

### 4.1 Crear Proyecto en Cloudflare
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. En el menú lateral, haz clic en **"Workers & Pages"**
3. Haz clic en **"Create application"**
4. Selecciona la pestaña **"Pages"**
5. Haz clic en **"Connect to Git"**

### 4.2 Conectar GitHub
1. Autoriza a Cloudflare para acceder a GitHub
2. Selecciona el repositorio `caprichos-de-sevilla`
3. Haz clic en **"Begin setup"**

### 4.3 Configurar el Build

**Configuración de Build:**

| Campo | Valor |
|-------|-------|
| **Production branch** | `main` |
| **Build command** | `vite build` |
| **Build output directory** | `dist/public` |

**Variables de Entorno (Opcional):**

Si quieres modo apartamento único, añade:
- **Variable name:** `VITE_APARTMENT`
- **Value:** `ibarra` o `quevedo`

> ⚠️ **IMPORTANTE:** Si NO añades esta variable, la app funcionará en modo multi-apartamento (los usuarios eligen).

### 4.4 Desplegar
1. Haz clic en **"Save and Deploy"**
2. Espera 2-3 minutos mientras se construye
3. ¡Listo! Tu app está en línea

---

## 🌐 Paso 5: Obtener tu URL

Cloudflare te dará una URL automática:
```
https://caprichos-de-sevilla.pages.dev
```

O algo similar. Puedes:
- ✅ Usar esta URL directamente
- ✅ Personalizar el subdominio en la configuración
- ✅ Conectar tu propio dominio (ej: `caprichos-sevilla.com`)

---

## 🔄 Actualizaciones Futuras

Para actualizar tu app:

1. **Haz cambios en Replit** (o en tu editor local)
2. **Sube los cambios a GitHub:**
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. **Cloudflare despliega automáticamente** ¡No necesitas hacer nada más!

---

## 🎯 Despliegues Múltiples (Opcional)

Si quieres **dos URLs separadas** (una para cada apartamento):

### Primera Deployment (Ibarra)
1. Sigue todos los pasos anteriores
2. En Variables de Entorno: `VITE_APARTMENT=ibarra`
3. Nombra el proyecto: `capricho-ibarra`
4. URL: `https://capricho-ibarra.pages.dev`

### Segunda Deployment (Quevedo)
1. En Cloudflare Pages, haz clic en **"Create a project"** de nuevo
2. Conecta el **mismo repositorio** de GitHub
3. En Variables de Entorno: `VITE_APARTMENT=quevedo`
4. Nombra el proyecto: `capricho-quevedo`
5. URL: `https://capricho-quevedo.pages.dev`

---

## ❓ Solución de Problemas

### Error: "Build failed"
- **Causa:** Falta algún archivo o configuración incorrecta
- **Solución:** Verifica que:
  - El build command sea exactamente: `vite build`
  - El output directory sea: `dist/public`
  - Todos los archivos del frontend estén en GitHub

### Error: "Page not found" (404)
- **Causa:** index.html no está en el directorio correcto
- **Solución:** Verifica que vite.config.ts tenga:
  ```typescript
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  }
  ```

### La app se ve en blanco
- **Causa:** Rutas de assets incorrectas
- **Solución:** Verifica que vite.config.ts tenga los alias correctos:
  ```typescript
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  }
  ```

---

## 📊 Comparación de Costos

| Plataforma | Costo Mensual | Límites |
|------------|---------------|---------|
| **Cloudflare Pages** | $0 (GRATIS) | 500 builds/mes, Ancho de banda ilimitado |
| **Replit (Autoscale)** | ~$2-3/mes | Basado en uso |
| **Replit (Reserved VM)** | $20-40/mes | Sin límites de uso |

---

## 🎉 ¡Listo!

Tu aplicación **Caprichos de Sevilla** ahora está desplegada en Cloudflare Pages:
- ✅ 100% Gratis, sin costos mensuales
- ✅ Actualización automática desde GitHub
- ✅ SSL/HTTPS incluido
- ✅ Velocidad global con CDN

**URL de tu app:** Cópiala desde el dashboard de Cloudflare y compártela con tus clientes 🚀

---

## 📞 Soporte

Si tienes problemas:
- Revisa los logs de build en Cloudflare Dashboard
- Consulta la [documentación de Cloudflare Pages](https://developers.cloudflare.com/pages/)
- Verifica que tu repositorio de GitHub esté actualizado
