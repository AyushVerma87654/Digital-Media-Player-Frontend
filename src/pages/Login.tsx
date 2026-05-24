import { FormikProps, withFormik } from "formik";
import { FC, useEffect } from "react";
import * as Yup from "yup";
import { connect, ConnectedProps } from "react-redux";
import { LoginPayload } from "../models/user";
import { AppState } from "../redux/store";
import { loginInitiatedAction } from "../redux/slice/userSlice";
import Button from "../components/Button";
import FormikInput from "../components/FormikInput";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import { Link, useNavigate } from "react-router-dom";

const initialValues: LoginPayload = { email: "", password: "" };

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(25).required(),
});

interface LoginProps extends ReduxProps {}

const Login: FC<LoginProps & FormikProps<LoginPayload>> = ({
  isLoggedIn,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-3">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Login to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormikInput name="email" label="Email Address" />
          <FormikInput name="password" type="password" label="Enter Password" />
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-40 mt-4 hover:bg-orange-600 transition cursor-pointer"
            >
              LOG IN
            </Button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const FormikHOC = withFormik<LoginProps, LoginPayload>({
  mapPropsToValues: () => initialValues,
  validationSchema: schema,
  handleSubmit: (values, { props }) => {
    props.loginUser(values);
  },
  validateOnMount: true,
})(Login);

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: isLoggedInSelector(state),
});
const mapDispatchToProps = {
  loginUser: loginInitiatedAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FormikHOC);
