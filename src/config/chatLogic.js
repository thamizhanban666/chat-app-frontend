export const getMyTime = (utc) => {
  const date = new Date(utc);
  const h = date.getHours().toString().length == "2" ? date.getHours() : ("0" + date.getHours());
  const m = date.getMinutes().toString().length == "2" ? date.getMinutes() : ("0" + date.getMinutes());
  return h + ":" + m
}

export const getMyDay = (utc) => {
  return new Date(utc).toLocaleString().split(",")[0]
}

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1]?.name : users[0]?.name;
}

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};