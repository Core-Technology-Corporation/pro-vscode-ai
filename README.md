# Pro AI Assistant

Asistente de IA para VS Code con chat integrado, edición inline, revisión de
código y soporte multi-proveedor (Anthropic, OpenAI, Google Gemini, Ollama y
LM Studio).

## Características

- **Chat** en la barra lateral con streaming de respuestas.
- **Explain / Fix / Optimize** sobre el código seleccionado, vía menú
  contextual, Quick Fixes o atajos de teclado.
- **Generate**: genera código a partir de una instrucción en lenguaje natural.
- **Commit message**: genera mensajes de commit a partir del diff (staged o
  working) y los inserta en el input box de Source Control.
- **Historial de chats** en un árbol dedicado.
- **Completado inline** experimental basado en el proveedor configurado.
- Soporte para múltiples proveedores de modelos, intercambiables desde la
  barra de estado.

## Requisitos

- VS Code ^1.85.0
- Node.js ^18 (solo para desarrollo)
- Una API key del proveedor que uses (Anthropic, OpenAI o Google), o un
  servidor local de Ollama / LM Studio corriendo.

## Configuración de la extensión

| Setting | Descripción | Default |
|---|---|---|
| `proAi.provider` | Proveedor activo (`anthropic`, `openai`, `google`, `ollama`, `lmstudio`) | `anthropic` |
| `proAi.model` | Identificador del modelo | `claude-sonnet-5` |
| `proAi.temperature` | Temperatura de muestreo | `0.3` |
| `proAi.maxTokens` | Tokens máximos de salida | `4096` |
| `proAi.ollama.baseUrl` | URL base del servidor Ollama local | `http://localhost:11434` |
| `proAi.lmstudio.baseUrl` | URL base del servidor LM Studio local | `http://localhost:1234/v1` |
| `proAi.contextLines` | Líneas de contexto alrededor del cursor | `200` |

Las API keys se guardan de forma segura con `SecretStorage` (no en settings
en texto plano). Configúralas con el comando **Pro AI: Select Model**.

## Comandos

| Comando | Descripción |
|---|---|
| `Pro AI: Open Chat` | Abre el panel de chat |
| `Pro AI: Explain Code` | Explica el código seleccionado |
| `Pro AI: Fix Code` | Corrige el código seleccionado |
| `Pro AI: Optimize Code` | Optimiza el código seleccionado |
| `Pro AI: Generate Code` | Genera código a partir de una instrucción |
| `Pro AI: Generate Commit Message` | Genera un mensaje de commit desde el diff |
| `Pro AI: Clear Chat History` | Borra el historial de chats |
| `Pro AI: Select Model` | Cambia proveedor/modelo y configura API keys |

## Desarrollo

```bash
npm install
npm run watch      # esbuild en modo watch
```

Luego presiona `F5` en VS Code (configuración "Run Extension") para abrir una
ventana de desarrollo con la extensión cargada.

### Tests

```bash
npm run test:unit         # vitest, funciones puras (utils/)
npm run test:integration  # @vscode/test-cli, activación de la extensión
```

### Lint y typecheck

```bash
npm run lint
npm run typecheck
```

### Empaquetar y publicar

```bash
npm run package    # genera el .vsix con vsce
npm run release -- patch --publish   # bump de versión + publish a Marketplace
```

## Estructura del proyecto

```
src/
├── extension.ts       # Punto de entrada, arma el contenedor de dependencias
├── commands/           # Comandos de la Paleta de Comandos
├── providers/           # Integración con las APIs de VS Code (webview, tree-view, code-actions, completion, inline)
├── agents/               # Agentes especializados (chat, coding, review, refactor, docs)
├── models/               # Adaptadores de proveedores de IA
├── prompts/               # Prompts versionados en Markdown
├── services/               # Lógica de negocio, contexto, historial, settings
├── tools/                   # Acceso a terminal, filesystem, git, diagnostics, search
├── ui/                       # Statusbar, notifications, panels
├── utils/                     # Utilidades compartidas
└── types/                      # Tipos e interfaces comunes
```

## Licencia

MIT — ver [LICENSE](LICENSE).
