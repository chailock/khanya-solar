import { useState } from 'react';
import { run } from '../utils/validation';
// rulesFn(values) returns the validation rules, so rules can depend on other fields.
export default function useForm(initial, rulesFn) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (k, v) => { setValues((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: '' })); };
  const bind = (k) => ({ id: k, name: k, value: values[k], 'aria-invalid': !!errors[k], onChange: (e) => set(k, e.target.type === 'checkbox' ? e.target.checked : e.target.value) });
  const validate = (extra = {}) => { const e = { ...run(rulesFn(values), values), ...extra }; setErrors(e); return Object.keys(e).length === 0; };
  return { values, errors, set, bind, validate, setErrors };
}
