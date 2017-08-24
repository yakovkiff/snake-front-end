class UserForm {
  static render() {
    return `
    <form id="user-form" onsubmit="submitUser()">
      <label for="user-name"> Name </label>
      <input type='text' id="user-name">

      <label for="user-email"> Email </label>
      <input type='text' id="user-email">
      <input type='submit' id='submit' value='Submit'>
    </form>
    `
  }
  static renderOnPage() {
    $('#user-form-container').html(this.render())
  }
}
