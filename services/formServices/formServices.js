import { FormSpy } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_FORM_STATE } from "../../stores/reduxFormStore/reduxFormStore";

const UpdateForm = ({ form }) => {
  const dispatch = useDispatch();
  const updateForm = (form, state) => {
    dispatch(UPDATE_FORM_STATE({ form, state }));
  };

  return (
    <FormSpy
      subscription={{ values: true, modified: true }}
      onChange={(state) => {
        if (Object.keys(state.modified).length > 0) {
          updateForm(form, state);
        }
      }}
    />
  );
};

export default function FormServices() {
  const GetForm = (form) => {
    const formValue = useSelector((state) => state?.reduxForm[form]) || {};
    return formValue;
  };

  return { UpdateForm, GetForm };
}
