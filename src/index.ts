// Most of the parts are taken directly from https://github.com/prisma/vscode/blob/master/packages/vscode/src/extension.ts
// Imports are transformed so that they can work with CoC
import {
  ExtensionContext,
  workspace,
  LanguageClient,
  TransportKind,
  ServerOptions,
  LanguageClientOptions,
  commands,
} from "coc.nvim";

function createLanguageServer(
  serverOptions: ServerOptions,
  clientOptions: LanguageClientOptions
) {
  return new LanguageClient(
    "prisma",
    "Prisma Language Server",
    serverOptions,
    clientOptions
  );
}

export async function activate(context: ExtensionContext): Promise<void> {
  const serverModule = require.resolve("@prisma/language-server/dist/src/cli");

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = {
    execArgv: ["--nolazy", "--inspect=6009"],
    env: { DEBUG: true },
  };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for prisma documents
    documentSelector: [{ scheme: "file", language: "prisma" }],
  };

  // Create the language client
  let client = createLanguageServer(serverOptions, clientOptions);

  // Start the client. This will also launch the server
  context.subscriptions.push(client.start());

  context.subscriptions.push(
    commands.registerCommand("coc-prisma.restartLanguageServer", async () => {
      await client.stop();
      client = createLanguageServer(serverOptions, clientOptions);
      context.subscriptions.push(client.start());
      await client.onReady();
      workspace.showMessage("Prisma language server restarted.");
    })
  );
}
