import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


export const updateDataApi = async (data) => {
  return await api.put('/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const updateBannerApi = async (data) => {
  return await api.put('/updateBanner', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const cargarDatosApi = async (data) => {
  return await api.post('/cargar', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const cargarHorariosApi = async (data) => {
  return await api.put('/horario', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const updateLoginApi = async (login) => {
  return await api.post('/login', login)
}
export const updateForgotApi = async (emailForReset) => {
  return await api.post('/forgot-password', { email: emailForReset });
}
export const newPasswordApi = async ( token, newPassword ) => {
  return await api.post('/reset-password', { token, newPassword });
}

export const updateRegisterApi = async (user) => {
  return await api.post('/register', user, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateRegisterActualizarApi = async (data) => {
  return await api.put('/actualizar', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const loadPage = async () => {
  return await api.get(`/`)
}

export const getDataApi = async (name) => {
  return await api.get(`/locales/${name}`);
}

export const verifyTokenApi = async () => {
  return await api.get(`/verify-token`);
}

export const destroyApi = async (id) => {
  return await api.delete(`/destroy/${id}`);
}

export const loadApiCategory = async (category) => {
  return await api.post('/category', category);
}

export const logoutApi = async () => {
  return await api.post('/logout');
};



