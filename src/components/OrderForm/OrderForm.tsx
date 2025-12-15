import { useId } from "react";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./OrderForm.module.css";

interface OrderFormValues {
  username: string;
  email: string;
  delivery: string;
  deliveryTime: string;
  restrictions: string[];
  message: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  delivery: "pickup",
  deliveryTime: "",
  restrictions: [],
  message: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name too short")
    .max(10, "Name too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  delivery: Yup.string()
    .oneOf(["pickup", "courier", "drone"], "Invalid delivery method")
    .required("Delivery method is required"),
  restrictions: Yup.array().of(Yup.string()),
  deliveryTime: Yup.string().required("Select delivery time"),
  message: Yup.string().min(5, "Message too short").max(30, "Message too long"),
});

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Submitted order:", values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Client Info</legend>

          <label htmlFor={`${fieldId}-username`} className={styles.label}>
            Name
          </label>
          <Field
            type="text"
            name="username"
            id={`${fieldId}-username`}
            className={styles.input}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={styles.error}
          />

          <label htmlFor={`${fieldId}-email`} className={styles.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={styles.input}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={styles.error}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Delivery method</legend>

          <label className={styles.option}>
            <Field type="radio" name="delivery" value="pickup" />
            Pickup
          </label>
          <label className={styles.option}>
            <Field type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label className={styles.option}>
            <Field type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
          <ErrorMessage
            name="delivery"
            component="span"
            className={styles.error}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Dietary restrictions</legend>

          <label className={styles.option}>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label className={styles.option}>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label className={styles.option}>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
        </fieldset>

        <label htmlFor={`${fieldId}-deliveryTime`} className={styles.label}>
          Preferred delivery time
        </label>
        <Field
          as="select"
          name="deliveryTime"
          id={`${fieldId}-deliveryTime`}
          className={styles.input}
        >
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00-12:00)</option>
          <option value="afternoon">Afternoon (12:00-16:00)</option>
          <option value="evening">Evening (16:00-20:00)</option>
        </Field>
        <ErrorMessage
          name="deliveryTime"
          component="span"
          className={styles.error}
        />

        <label htmlFor={`${fieldId}-message`} className={styles.label}>
          Additional message
        </label>
        <Field
          as="textarea"
          name="message"
          rows={4}
          id={`${fieldId}-message`}
          className={styles.textarea}
        />
        <ErrorMessage
          name="message"
          component="span"
          className={styles.error}
        />

        <button type="submit" className={styles.button}>
          Place order
        </button>
      </Form>
    </Formik>
  );
}
