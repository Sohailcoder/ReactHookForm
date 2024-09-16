
function Simple() {
  return (
    <div>
        <form>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' />

            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' />

            <label htmlFor='channel'>channel</label>
            <input type='text' id='channel' name='channel' />
        </form>

    </div>
  )
}

export default Simple