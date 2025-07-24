# Teste InMeta - Cards Marketplace

Este repositório contém o frontenddo projeto de teste da **InMeta**, desenvolvido com Vue 3.

---

## Tecnologias utilizadas (Bibliotecas, frameworks e ferramentas)

- node v22.17.1
- vue ^3.5.17
- axios ^1.10.0
- lucide-vue-next ^0.525.0
- pinia 3.0.3
- pinia-plugin-persistedstate ^4.4.1
- vee-validate ^4.15.1
- vue-router ^4.5.1
- vue-toast-notification ^3.1.3
- yup ^1.6.1
- vite ^7.0.4

## Metodologias de implementação

### BEM CSS

No projeto, foi adotado o BEM CSS, metodologia que permite uma melhor manutenção dos componentes, facilitando a legibilidade e modificações;

### Atomic Design

O Atomic Design propõe dividir os componentes de uma aplicação em diferentes níveis de granularidade: átomos, que são os elementos mais básicos; moléculas, que geralmente são combinações de átomos; organismos, que agrupam moléculas e, eventualmente, átomos; e, por fim, páginas ou views, que normalmente são compostas por diversos organismos, mas que, 
em alguns casos, também podem incluir átomos ou moléculas diretamente.

Obs.: Neste projeto foi decidido não utilizar a camada de template, porém é uma abordagem válida para utilização.

### Composables

Foram utilizados composables no projeto, principalmente para remover ou reduzir ao máximo a carga de processamento lógico nos componentes de visualização.

### Store (Pinia)

Utilizando Pinia, o controle de estado principal do projeto foi da sessão do usuário logado, possibilitando em qualquer ponto da aplicação recuperar o valor do token ou os dados do usuário. Os outros dados em sua maioria foram tratados utilizando composables para consumir a api e com Vue Query para cachear os dados em maior volume, como o get de Cards e de Trades.

## Passo a passo para rodar o projeto

### Instalar as dependências e rodar

Dentro da pasta frontend execute o comando para instalar as dependências encontradas no package.json:

```bash
npm i
```

Após instalado, execute o comando para rodar o frontend:

```bash
npm run dev
```

