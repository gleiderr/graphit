# Origem
Aplicação se surgiu como ferramenta para estudo da Bíblia, mas que durante seu desenvolvimento tem demonstrado potencial para relacionar, gerenciar, analisar e armazenar informações de forma eficiente.

# Ideia Base
Redigimos e lemos em forma de lista sequencial, mas a informação em si é organizada em forma de grafo. A Bíblia por exemplo pode ser vista como uma grande lista de versículos, porém seus versículos são interrelacionados.

Explicitar relacionamentos entre informações pode auxiliar sua fundamentação e interpretação.

# Definições
## Base de Dados

A definição da base de dados não define qual ferramenta deve ser utilizada para armazenar os dados.
- Cada [GNode] deve conter um [identificador] único e seu dado propriamente dito;
- Cada [GEdge] deve referenciar seu nodo de destino
- Cada [GList] deve conter um [identificador] único que referencia seu nodo de origem e uma lista de [GEdge]s

O Graphit atualmente foi desenvolvido para manipular:
- Firebase.

Atualmente o desenvolvimento tem ocorrido como prova de conceito e ainda não foi extensivamente documentado.
