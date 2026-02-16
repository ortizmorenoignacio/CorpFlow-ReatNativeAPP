import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const Calendar = (props) => (
  <FontAwesome5 name="calendar-alt" size={24} color="black" {...props} />
);

//TABS
export const User = (props) => (
  <FontAwesome5 name="user-alt" size={24} color={props.color} />
);

export const Users = (props) => (
  <FontAwesome5 name="users" size={24} color={props.color} />
);

export const Engranaje = (props) => (
  <FontAwesome5 name="cog" size={24} color={props.color} />
);

export const SignOut = (props) => (
  <FontAwesome5 name="sign-out-alt" size={24} color={props.color} />
);

export const HomeIcon = (props) => (
  <FontAwesome5 name="home" size={24} color={props.color} />
);

export const CalendarForm = (props) => (
  <FontAwesome5 name="calendar-alt" size={20} color="black" {...props} />
);
