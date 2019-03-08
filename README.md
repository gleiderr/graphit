# Origem
Aplicação se surgiu como ferramenta para estudo da Bíblia, mas que durante seu desenvolvimento tem demonstrado potencial para relacionar, gerenciar, analisar e armazenar informações de forma eficiente.

# Ideia Base
Redigimos e lemos em forma de lista sequencial, mas a informação em si é organizada em forma de grafo. A Bíblia por exemplo pode ser vista como uma grande lista de versículos, porém seus versículos são interrelacionados.

Explicitar relacionamentos entre informações pode auxiliar sua fundamentação e interpretação.

# Definições
## Base de Dados

A definição da base de dados não define qual ferramenta ou estrutura deve ser utilizada para armazenar os dados. Apenas define quais são as estruturas de dados utilizadas pelo Graphit.

Atualmente o Graphit segue incorporado com uma implementação para:
- Firebase.

## Estrutura de Objetos
Essa estrutura de objetos foi pensada para ser permissiva o suficiente para permitir a representação de qualquer tipo de grafo e o desenvolvimento diferentes interpretações dos dados.
- Cada [GNode] corresponde a um único nodo de um grafo. Deve conter um [identificador] único e seu dado propriamente dito;
- Cada [GEdge] deve referenciar seu nodo de destino. Ele também pode conter outros dados (e.g. labels);
- Cada [GList] deve conter um [identificador] único que referencia seu nodo de origem e uma lista de [GEdge]s;

Atualmente o desenvolvimento tem ocorrido como prova de conceito e sua documentação não deve ser tomada como definitiva.
