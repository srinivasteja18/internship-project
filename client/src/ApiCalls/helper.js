export const createAppointment = (data) => {
  return fetch(`/api/appointment/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getAppointment = (appointmentId) => {
  return fetch(`/api/appointment/${appointmentId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getAllAppointments = () => {
  return fetch(`/api/appointments`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updateAppointment = (appointmentId, data) => {
  return fetch(`/api/appointment/update/${appointmentId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const deleteAppointment = (appointmentId) => {
  return fetch(`/api/appointment/delete/${appointmentId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};
