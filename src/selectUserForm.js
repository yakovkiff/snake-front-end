class SelectUserForm {
  static render() {
    return `
    <form id="select-user-form">
      <select id="user-selection">
        <option value="" disabled selected>Select Username</option>
      </select>
      <button type="button" id="load-saved-game">Load Saved Game</button>
    </form>
    `
  }
  static renderOnPage() {
    $('#select-user-form-container').html(this.render())
  }
}
