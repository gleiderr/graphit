# Origem
Essa aplicação se surgiu como ferramenta para estudo da Bíblia, mas que durante o desenvolvimento demonstrou potencial para relacionar, gerenciar, analisar e armazenar informações de forma simples e eficiente.

# Ideia Base
Redigimos e lemos em forma de lista sequencial, mas a informação em si é organizada em rede. A Bíblia, por exemplo, pode ser vista como uma grande lista de versículos cujos versículos estão interrelacionados.

Explicitar relacionamentos entre informações pode auxiliar sua fundamentação e interpretação.

# Definições
## Base de Dados
Não há definição de qual ferramenta ou estrutura deve ser utilizada para armazenar os dados. Apenas define-se quais estruturas de dados são utilizadas pelo Graphit.

Por uma questão de conveniência, atualmente o Graphit segue incorporado com uma implementação para:
- Firebase.

## Estrutura de Objetos
Essa estrutura de objetos foi pensada para permitir a representação de qualquer tipo de grafo não restringindo como os dados em si devem ser representados.
- A classe [GNode] é responsãvel por representar cada nodo de um grafo. Deve conter um [identificador] único e seu dado propriamente dito;
- A classe [GEdge] deve referenciar seu nodo de destino. Ele também pode conter outros dados (e.g. labels);
- A classe [GList] deve conter um [identificador] único que referencia seu nodo de origem e uma lista de [GEdge]s;

Atualmente o desenvolvimento tem ocorrido como prova de conceito e sua documentação não deve ser tomada como definitiva.
