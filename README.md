# Unreal Code Cleanup

Extensão para Visual Studio Code destinada a limpar e formatar arquivos **UnrealScript** (`.uc`, `.uci`).

O objetivo principal desta ferramenta é remover "poluição" visual de arquivos legados ou mal formatados, facilitando a leitura e manutenção do código.

## Funcionalidades

Ao executar a limpeza, a extensão realiza as seguintes ações no arquivo selecionado:

1.  **Remove Comentários**:
    - Comentários de linha (`// ...`) são removidos.
    - Comentários de bloco (`/* ... */`) são removidos.
2.  **Limpa Espaços em Branco**:
    - Remove espaços desnecessários no final de cada linha (trailing whitespace).
    - Reduz múltiplas linhas em branco consecutivas para no máximo **uma** linha em branco, mantendo o código arejado mas compacto.
    - Remove linhas em branco no início e fim do arquivo.

## Como Usar

Existem três formas de utilizar a extensão:

### 1. Menu de Contexto (Recomendado)

Clique com o **botão direito** em qualquer arquivo na árvore de arquivos (Explorer) ou dentro de um editor aberto e selecione a opção:
`Unreal Cleanup`

### 2. Command Palette

1.  Pressione `Ctrl+Shift+P` (ou `F1`).
2.  Digite `Unreal Cleanup`.
3.  Pressione Enter.

### 3. Atalho de Teclado

A extensão vem com o comando pronto para receber um atalho. Para configurar:

1.  Vá em _File > Preferences > Keyboard Shortcuts_.
2.  Busque por `Unreal Cleanup`.
3.  Defina a combinação de teclas de sua preferência (ex: `Ctrl+Alt+C`).

## Exemplo

**Antes:**

```unrealscript
function Teste() {
    // Comentário antigo
    var int i;



    /* Outro comentário
       de bloco */
    i = 0;
}
```

**Depois:**

```unrealscript
function Teste() {
    var int i;

    i = 0;
}
```

## Requisitos

- VS Code 1.107.0 ou superior.

---

**Enjoy your clean code!**
