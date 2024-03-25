import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'https://arachnid-innocent-radically.ngrok-free.app'
																	   
function showError(err) {
	Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
}

function showSuccess(msg){
	Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }