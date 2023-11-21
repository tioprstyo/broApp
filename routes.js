import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screen/Home';
import Blank from './src/screen';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/SignUp/HrdCall';
import CompanySignUp from './src/screen/SignUp/Company';
import SelfSignUp from './src/screen/SignUp/Employee';
import EmailVerification from './src/screen/SignUp/EmailVerification';
import SignUpNotification from './src/screen/SignUp/Notification';
import Otp from './src/screen/Otp/SignIn';
import Verification from './src/screen/Otp/Payment';
import EnterPin from './src/screen/PIN/Enter';
import SetUpPin from './src/screen/PIN/SetUp';
import ResetPin from './src/screen/PIN/Reset';
import ChangePin from './src/screen/PIN/Change';
import RequestSuccess from './src/screen/PIN/Confirmation/Success';
import RequestFailed from './src/screen/PIN/Confirmation/Failed';
import ErrorOTP from './src/screen/Otp/Error';
import OnBoard from './src/screen/OnBoard';
import Contact from './src/screen/Contact';
import Confirmation from './src/screen/Confirmation';
import Transaction from './src/screen/Transaction';
import Notification from './src/screen/Notification';
import Transfer from './src/screen/Transfer';
import Widrawal from './src/screen/Widrawal';
import Greetings from './src/screen/Greetings';
import FisrtLogin from './src/screen/FisrtLogin';
import { createDrawerNavigator } from 'react-navigation-drawer';

const AppNavigator = createStackNavigator(
  {
    Blank: {
      screen: Blank,
      navigationOptions: {
          headerShown: false,
      },
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
          headerShown: false,
      },
    },
    OnBoard: {
      screen: OnBoard,
      navigationOptions: {
          headerShown: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    FisrtLogin: {
      screen: FisrtLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
    Greetings: {
      screen: Greetings,
      navigationOptions: {
        headerShown: false,
      },
    },
    Confirmation: {
        screen: Confirmation,
        navigationOptions: {
            headerShown: false,
        },
    },
    Transaction: {
      screen: Transaction,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        headerShown: false,
      },
    },
    Transfer: {
      screen: Transfer,
      navigationOptions: {
        headerShown: false,
      },
    },
    Widrawal: {
      screen: Widrawal,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            headerShown: false,
        },
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerShown: false,
        },
    },
    CompanySignUp: {
      screen: CompanySignUp,
      navigationOptions: {
          headerShown: false,
      },
    },
    SelfSignUp: {
      screen: SelfSignUp,
      navigationOptions: {
          headerShown: false,
      },
    },
    EmailVerification: {
      screen: EmailVerification,
      navigationOptions: {
          headerShown: false,
      },
    },
    SignUpNotification: {
      screen: SignUpNotification,
      navigationOptions: {
          headerShown: false,
      },
    },
    Otp: {
        screen: Otp,
        navigationOptions: {
            headerShown: false,
        },
    },
    Verification: {
      screen: Verification,
      navigationOptions: {
            headerShown: false,
        },
    },
    EnterPin: {
        screen: EnterPin,
        navigationOptions: {
            headerShown: false,
        },
    },
    SetUpPin: {
      screen: SetUpPin,
        navigationOptions: {
          headerShown: false,
      },
    },
    ChangePin: {
      screen: ChangePin,
        navigationOptions: {
          headerShown: false,
      },
    },
    ResetPin: {
      screen: ResetPin,
        navigationOptions: {
          headerShown: false,
      },
    },
    ErrorOTP: {
      screen: ErrorOTP,
        navigationOptions: {
            headerShown: false,
        },
    },
    RequestSuccess: {
      screen: RequestSuccess,
        navigationOptions: {
            headerShown: false,
        },
    },
    RequestFailed: {
      screen: RequestFailed,
        navigationOptions: {
            headerShown: false,
        },
    }
  },
  {
    initialRouteName: 'Blank'
  },
);

const Drawer = createDrawerNavigator({
  AppNavigator: {
    name: 'AppNavigator',
    screen: AppNavigator,
  },
});

export default createAppContainer(Drawer);
