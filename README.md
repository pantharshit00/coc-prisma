# coc-prisma

Coc extension that implements Prisma Language Server. Use it alongside with the Prisma syntax plugin: https://github.com/pantharshit00/vim-prisma

## Install

`:CocInstall coc-prisma`


## Screenshots
![image](https://user-images.githubusercontent.com/22195362/85920005-c8faca80-b88d-11ea-9a49-e3ebfad22375.png)

![image](https://user-images.githubusercontent.com/22195362/85920012-d2843280-b88d-11ea-8517-95595c354325.png)

## Commands

`coc-prisma.restartLanguageServer`: Restarts the Prisma Language Server


## Formatting

This extension supports formatting of Prisma files. Under the hood, the language server runs the prisma-fmt binary and it produces the formatted output. 


In order to format your file, you can `:Format` which is provided by CoC. If you want to enable autoformatting on save, add `prisma` under the `coc.preferences.formatOnSaveFiletypes` key in `coc-settings.json` file.  You can typically find your `coc-settings.json` located at `~/.config/nvim/coc-settings.json`

```json
{
  "coc.preferences.formatOnSaveFiletypes": [
    "prisma"
  ]
}

```

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
