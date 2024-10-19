import { Button, Form, Typography } from "antd";

import styles from './sign-in.module.css';

import { useSignInWithGoogleMutation } from "../../redux/services/authApiSlice";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const navigate = useNavigate();
    const [signInWithGoogle] = useSignInWithGoogleMutation();

    const handleSignIn = async () => {
      try {
        const response = await signInWithGoogle();
        if ('data' in response) {
          navigate('/booking');
        } else {
          console.error('Ошибка авторизации:', response.error);
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    };

    return (
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            {/* <Logo className={styles.logo} /> */}
            <div className={styles.formContainer}>
              <Typography.Title level={2} className={styles.formTitle}>
                Вход
              </Typography.Title>
              <Form
                // form={form}
                labelCol={{ span: 24 }}
                colon={false}
                // onFinish={onFinish}
                requiredMark={false}
                // onFieldsChange={onFieldsChange}
                autoComplete='on'
              >
                <Form.Item className={styles.formItemButton}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    block={true}
                    className={styles.submitButton}
                    // disabled={isButtonDisabled}
                    onClick={handleSignIn}
                  >
                    Sign In With Google
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Typography.Text className={styles.copyright}>
            Copyright &copy;{new Date().getFullYear()} Produced by whoo
          </Typography.Text>
        </div>
      );
};


