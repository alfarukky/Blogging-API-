import * as useServices from '../services/auth.services.js';
export const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    const result = await useServices.register(
      email,
      first_name,
      last_name,
      password
    );
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await useServices.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
