class UserForm {
  static render() {
    return `
    <form id="user-form">
      <label for="user-name"> Name </label>
      <input type='text' id="user-name">

      <label for="user-email"> Email </label>
      <input type='text' id="user-email">
      <input type='button' id='submit' onclick='submitUser()' value='Submit'>
    </form>
    `
  }
  static renderOnPage() {
    $('#user-form-container').html(this.render())
  }
}
