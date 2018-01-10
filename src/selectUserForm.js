class SelectUserForm {
  static render() {
    const userNames = ['beryl', 'shmeryl']
    const options = userNames.map(userName => `<option value=${userName}>${userName}</option>`)
    return `
    <form id="select-user-form">
      <select name="carlist">
        <option value="" disabled selected>Select Username</option>
        ${options}
      </select>
      <button type="button" id="load-saved-game">Load Saved Game</button>
    </form>
    `
  }
  static renderOnPage() {
    $('#select-user-form-container').html(this.render())
  }
}
