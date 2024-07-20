const isValidImageUrl = async (url) => {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');
    return res.ok && contentType && contentType.startsWith('image/');
  } catch (error) {
    return false;
  }
};

const avatarUrl = "https://scontent.fsif1-1.fna.fbcdn.net/v/t39.30808-1/374734159_1480647582711305_3023156510724626670_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=QPDysQLAaeEQ7kNvgE-Irle&_nc_ht=scontent.fsif1-1.fna&oh=00_AYDDS7SelEXX7EG2mxFSdnheDcamD6OF8m0G2nuNtltA2Q&oe=66A18792"

const test = async () => {
  const isValid = await isValidImageUrl(avatarUrl);

  console.log(isValid);
}

test();