export default function ({ store, app, route, redirect }) {
    const user = store.state.users.user;
    // if (route.path === '/' || route.path === '') {
    //     if (user) {
    //         return redirect('/profile')
    //     }
    // }

    // if (route.path !== '/auth/signin' && route.path !== '/auth/signup' && route.path !== '/' && route.path !== '') {
    //     if (!user) {
    //         return redirect('/auth/login')
    //     }
    // }
    if (!user) {
        return redirect('/login')
    }

}
