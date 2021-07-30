const Check = require("../models/Check");

async function existanceOfSameCheckName(name, email) {
  try {
    let check_existance = await Check.exists({
      name: name,
      email: email,
    });

    if (check_existance) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }
}

async function createCheck(name, email, URL, timeInterval,timeOut, threshold, tags,webhook) {
  const nameExistance = await existanceOfSameCheckName(name, email);
  const newCheck = {
    name: name,
    email: email,
    URL: URL,
    timeInterval: timeInterval,
    timeOut: timeOut,
    tags: tags,
    threshold:threshold,
    webhook:webhook
  };

  if (nameExistance === true) {
    return "Check name is already exist associated to your email";
  } else if (nameExistance === false) {
    await Check.create(newCheck);

    return "A new check is created";
  } else {
    // if it returns error (not true nor false)

    return nameExistance;
  }
}

async function findCheckByName(name, email) {
  const result = await Check.find({
    name: name,
    email: email,
  });

  return result;
}

async function findMyChecks(email) {
  const result = await Check.find({
    email: email,
  });
  return result;
}

async function deleteCheck(email, name) {
  let check_existance = await Check.exists({
    name: name,
    email: email,
  });

  if (check_existance) {
    await Check.deleteOne({ name: name, email: email });
    return {
      message: name + " check is deleted successfully",
    };
  } else if (!check_existance) {
    return { message: "check is not exist " };
  }
}

async function deleteAllMyChecks(email) {
  await Check.deleteMany({ email: email });

  return { message: "All your checks are deleted successfully ! " };
}

async function updateCheckName(email, oldName, newName) {
  let check_existance = await Check.exists({
    email: email,
    name: oldName,
  });
  if (check_existance) {
    await Check.updateOne(
      { email: email, name: oldName },
      { $set: { name: newName } }
    );

    return { message: "Name is updated" };
  } else {
    return { message: "Name is not found" };
  }
}

async function updateCheckURL(email, checkName, newURL) {
  let check_existance = await Check.exists({
    email: email,
    name: checkName,
  });
  if (check_existance) {
    await Check.updateOne(
      {
        email: email,
        name: checkName,
      },
      { $set: { URL: newURL } }
    );

    return { message: "URL is updated" };
  } else {
    return { message: "Check case is not found" };
  }
}

async function pushNewTag(email, checkName, newTagName) {
  let check_existance = await Check.exists({
    email: email,

    name: checkName,
  });

  if (check_existance) {
    await Check.updateOne(
      { email: email, name: checkName },
      { $push: { tags: newTagName } }
    );
    return { message: "Tags are updated" };
  } else {
    return { message: "Check case is not found" };
  }
}

async function updateTag(email, checkName, oldTagName, newTagName) {
  let check_existance = await Check.exists({
    email: email,
    name: checkName,
  });

  if (check_existance) {
    const result = await Check.find({
      email: email,
      name: checkName,
    });

    const tagsArray = await result[0].tags;
    const indexOfOld = tagsArray.indexOf(oldTagName);
    tagsArray[indexOfOld] = newTagName;

    await Check.updateOne(
      { email: email, name: checkName },
      { $set: { tags: tagsArray } }
    );

    return { message: "Tags are updated" };
  } else {
    return { message: "Check case is not found" };
  }
}

async function deleteAllTags(email, checkName) {
  let check_existance = await Check.exists({
    email: email,
    name: checkName,
  });

  if (check_existance) {
    const result = await Check.find({
      email: email,
      name: checkName,
    });

    await Check.updateOne(
      {
        email: email,
        name: checkName,
      },
      { $set: { tags: [] } }
    );

    return { message: "Tags are deleted" };
  } else {
    return { message: "Check case is not found" };
  }
}

async function deleteOneTag(email, checkName, targetTag) {
  let check_existance = await Check.exists({
    email: email,

    name: checkName,
  });

  if (check_existance) {
    const result = await Check.find({
      email: email,
      name: checkName,
    });

    const tagsArray = await result[0].tags;
    const indexOfTarget = tagsArray.indexOf(targetTag);
    tagsArray.splice(indexOfTarget, 1);

    await Check.updateOne(
      {
        email: email,
        name: checkName,
      },
      { $set: { tags: tagsArray } }
    );

    return { message: "Tag is deleted" };
  } else {
    return { message: "Check case is not found" };
  }
}

async function findChecksByTag(targetTag, email) {
  const result = await Check.find({
    email: email,
    tags: targetTag,
  });

  return result;
}

async function pauseCheck(email, checkName) {
  let check_existance = await Check.exists({
    email: email,
    name: checkName,
  });

  if (check_existance) {
    await Check.updateOne(
      {
        email: email,
        name: checkName,
      },
      { $set: { isCheckActive: false } }
    );
    return  { message: "Check is paused" };
  }else {
    return  { message: "Check is not paused" };

  }
}

async function activeCheck(email, checkName) {
  let check_existance = await Check.exists({
    email: email,
    name: checkName,
  });

  if (check_existance) {
    await Check.updateOne(
      {
        email: email,
        name: checkName,
      },
      { $set: { isCheckActive: true } }
    );
    return  { message: "Check is paused" };

  }else {
    return  { message: "Check is not paused" };

  }
}






module.exports = {
  createCheck: createCheck,
  findCheckByName: findCheckByName,
  findMyChecks: findMyChecks,
  deleteCheck: deleteCheck,
  deleteAllMyChecks: deleteAllMyChecks,
  updateCheckName: updateCheckName,
  updateCheckURL: updateCheckURL,
  pushNewTag: pushNewTag,
  updateTag: updateTag,
  deleteAllTags: deleteAllTags,
  deleteOneTag: deleteOneTag,
  findChecksByTag: findChecksByTag,
  pauseCheck:pauseCheck,
  activeCheck:activeCheck
};
