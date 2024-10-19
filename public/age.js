function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

document.addEventListener('DOMContentLoaded', () => {
  const birthday = "2002-11-10";
  document.getElementById('age').innerText = "Age: " + calculateAge(birthday);
});
  