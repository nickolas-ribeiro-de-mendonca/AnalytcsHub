import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.1.10.177:3000'
																	   //10.1.10.136:3000
function showError(err) {
	Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
}

function showSuccess(msg){
	Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }