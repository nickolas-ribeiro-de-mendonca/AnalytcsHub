const tableHead = ['WS', 'Razão Social', 'Apelido', 'CPF/CNPJ', 'Ultima Sincronização', 'Situação', 'MobServer'];
const tableData = [
  [1, 'Emp 1', 'Apelido 1', '123.456.789.10', '14/11/23 10:20', 'Normal', '1.19.0'],
  [2, 'Emp 2', 'Apelido 2', '123.456.789.10', '14/11/23 10:20', 'Atrasado','1.19.5'],
  [3, 'Emp 3', 'Apelido 3', '123.456.789.10', '14/11/23 10:20', 'Normal', '1.19.0'],
  [4, 'Emp 4', 'Apelido 4', '123.456.789.10', '14/11/23 10:20', 'Parado', '1.19.3'],
  [5, 'Emp 5', 'Apelido 5', '123.456.789.10', '14/11/23 10:20', 'Normal', '1.19.5'],
  [6, 'Emp 6', 'Apelido 6', '123.456.789.10', '14/11/23 10:20', 'Atrasado', '1.19.1'],
];
const widthArr = [50, 100, 100, 120, 150, 100, 100];
const apontadorHead = ['WS', 'Apontador', 'Apontamentos','Tempo de Envio']
const apontadorData =[
  ['1', 'Nickolas', 200, 1.5],
  ['1', 'Chistopher', 100, 1],
  ['1', 'Thiago', 300, 3],
  ['1', 'Lucas', 200, 3],
  ['1', 'Pedro', 500, 5],
  ['1', 'Laura', 100, 1],
  ['1', 'Rafaela', 300, 5],
]
const apontadorWidthArr = [100, 100, 100, 100]

export { tableHead, tableData, widthArr,apontadorData, apontadorHead, apontadorWidthArr};