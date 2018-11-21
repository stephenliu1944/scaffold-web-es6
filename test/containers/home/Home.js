import Home from 'containers/home/Home';

it('check home.render()', () => {
    var home = new Home();
    expect(home.render()).toMatchSnapshot();
});

// TODO: