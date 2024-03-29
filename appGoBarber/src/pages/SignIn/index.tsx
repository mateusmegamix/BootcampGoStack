import React, {useCallback, useRef} from 'react'
import {
    Image, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    TextInput,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import {useAuth} from '../../hooks/auth'

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const passwordInputRef = useRef<TextInput>(null)
    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation()

    const {signIn} = useAuth();

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

        } catch(err){
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
            }

            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, cheque as credenciais.'
            )
        }
    }, [signIn]);

    return (
        <>
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{flex: 1}}    
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType="email-address"
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password" 
                                icon="lock" 
                                blurOnSubmit={false}
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType='send'
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />
                        </Form>
                        <Button 
                            onPress={() => {
                                formRef.current?.submitForm()
                            }}
                        >
                            Entrar
                        </Button>
                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
                    <CreateAccountButton onPress={() => {navigation.navigate('SignUp')}}>
                        <Icon name="log-in" size={20} color="#FF9000" />
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>

                </KeyboardAvoidingView>
        </>
    )
}

export default SignIn