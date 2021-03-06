import React from 'react';
import '../../styles.scss';
import { useDispatch } from 'react-redux';
import RegisterForm from './components/Form/RegisterForm';
import { Grid, Header, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import { formInitialValues, formValidationSchema } from './constants';
import { register } from '../../actions';
import { trimFormValues } from '../../../../utils/helpers';
import { RegisterFormValues } from '../../types';
import { FormikProps } from 'formik/dist/types';
import useReactRouter from 'use-react-router';

const SignUp = () => {
    const dispatch = useDispatch();

    const { history } = useReactRouter();

    const renderForm = (props: FormikProps<RegisterFormValues>) => <RegisterForm {...props} />;

    const handleOnSubmit = (formData: RegisterFormValues) => {
        const formDataPayload = trimFormValues(formData);

        dispatch(register(formDataPayload));
    };

    const handleClick = () => {
        history.push('/login');
    };

    return (
        <Grid textAlign="center" className="auth-wrapper" verticalAlign="middle">
            <Grid.Column className="auth-holder">
                <Header as="h2" className="primary-text">
                    Creating a new profile
                </Header>

                <Formik
                    render={renderForm}
                    initialValues={formInitialValues}
                    onSubmit={handleOnSubmit}
                    validationSchema={formValidationSchema}
                    enableReinitialize
                />

                <Message>
                    Already with us?
                    <a onClick={handleClick}> Sign In</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default SignUp;
