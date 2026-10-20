# Pro AI Assistant

## Descripción breve (tarjeta)

Asistente de IA para VS Code con chat en streaming y comandos para explicar, corregir, optimizar y generar código, además de mensajes de commit. Funciona con cinco proveedores: Anthropic, OpenAI, Google Gemini, Ollama y LM Studio.

## Descripción completa

Pro AI Assistant integra modelos de lenguaje en el flujo de trabajo de VS Code:

- Un panel lateral de **chat con streaming**.
- Comandos **Explain / Fix / Optimize** sobre el código seleccionado, disponibles desde el menú contextual, como Quick Fixes o con atajos.
- **Generate**, que genera código a partir de una instrucción.
- **Mensaje de commit** generado a partir del diff y colocado en el campo de Source Control.
- **Historial** de conversaciones.
- **Autocompletado inline** experimental.

El proveedor y el modelo se cambian desde la barra de estado, y las API keys se guardan en el almacenamiento seguro del editor.

## Problema que resuelve

Muchos asistentes están atados a un solo proveedor o a un servicio en la nube. Este proyecto separa la interfaz del modelo, así que el mismo flujo funciona con APIs comerciales o con modelos locales (Ollama, LM Studio) cuando la privacidad o el costo son una prioridad.

## Objetivo

Ofrecer un asistente de código extensible, con varios proveedores y una arquitectura en capas (servicios, agentes y adaptadores de modelos).

## Público objetivo

Desarrolladores que quieren IA en el editor y control sobre qué proveedor o modelo usar, incluidos los que trabajan con modelos locales.

## Mi participación técnica

Confirmado por el historial de git: autor de los 7 commits (2026-07-10 → 2026-07-12). El alcance detallado de cada componente queda **pendiente de confirmar**.

## Funcionalidades destacadas

- Chat en webview con streaming fragmento a fragmento.
- 8 comandos: Open Chat, Explain, Fix, Optimize, Generate, Generate Commit Message, Clear History y Select Model.
- Code Actions (Quick Fixes) con IA en cualquier lenguaje.
- Selector de proveedor y modelo, más un indicador en la barra de estado.
- Generación de mensajes de commit desde el diff staged o del working tree.

## Tecnologías

| Categoría | Tecnologías |
|---|---|
| Lenguaje | TypeScript 5.7 |
| Plataforma | API de extensiones de VS Code (^1.85): Webview, TreeView, CodeActions, InlineCompletion, SecretStorage |
| IA | `@anthropic-ai/sdk`, `openai`, `@google/generative-ai`, Ollama (HTTP), LM Studio (compatible con OpenAI) |
| Build | esbuild 0.24 con `tsx` |
| Calidad | Vitest 2 (unitarias), `@vscode/test-cli` (integración), ESLint 9, `tsc --noEmit` |
| Publicación | `@vscode/vsce` 3, scripts de package y release |

## Arquitectura y aspectos técnicos

- **Inyección de dependencias manual**: `activate()` construye un `AppContext` con servicios y agentes y lo comparte con los comandos y providers.
- **Patrón adaptador**: cada proveedor implementa `AIModelProvider.chatStream()` como un `AsyncGenerator`, así que agregar un proveedor no afecta a la UI.
- **Agentes por responsabilidad**: chat, coding, refactor, review y docs. Los prompts son plantillas Markdown versionadas en `src/prompts/`.
- **Herramientas** para leer el contexto del workspace: filesystem, git, terminal, búsqueda y diagnósticos.

## Integraciones

Anthropic, OpenAI, Google Gemini, Ollama, LM Studio y la extensión Git de VS Code (campo de mensaje de commit).

## Seguridad

- API keys en `SecretStorage`, nunca en `settings.json` en texto plano.
- Content-Security-Policy estricta en el webview (`default-src 'none'`, scripts con `nonce`).
- Opción de procesamiento 100 % local con Ollama o LM Studio.

## Retos técnicos

- Unificar APIs de streaming distintas en una sola interfaz.
- Manejar el streaming del chat entre la extensión y el webview por mensajes.
- Controlar la frecuencia de las peticiones del autocompletado inline (debounce de 400 ms).

## Mejoras futuras recomendadas

- Conectar los agentes `review` y `docs` a comandos.
- Limitar el autocompletado inline a lenguajes concretos o hacerlo opcional, por el costo en proveedores de pago.
- Ampliar las pruebas más allá de `utils/` y la activación.
- Publicar en el Marketplace; hoy es `0.0.1` y está marcado como `private`.

## Estado

En desarrollo: versión `0.0.1`, *Unreleased* según el CHANGELOG. Existe un `.vsix` empaquetado en el repositorio.

## Capturas

| Archivo | Contenido |
|---|---|
| `presentacion/01-vista-principal.png` | Panel **Pro AI** (Chat e History) junto a `ai.service.ts`, con el indicador `anthropic: claude-sonnet-5` en la barra de estado. |
| `presentacion/02-funcionalidad-principal.png` | Comando **Pro AI: Select Model**: selector de los cinco proveedores, junto a la fábrica `createModelProvider`. |
| `presentacion/03-funcionalidad-complementaria.png` | Paleta de comandos con los comandos **Pro AI**: Explain, Fix, Optimize, Generate, Generate Commit Message, entre otros. |

Las capturas son de la extensión ejecutándose en un *Extension Development Host*. No se configuró ninguna API key, así que no se muestran respuestas del modelo.
