import SearchResult from 'components/searchResult/SearchResult';

it('check searchResult.renderDeny()', () => {
    var searchResult = new SearchResult();
    expect(searchResult.renderDeny()).toMatchSnapshot();
});

it('check searchResult.renderResourcecheck()', () => {
    var agentId = 10;
    var resource = 'Firefox';
    var searchResult = new SearchResult();

    expect(searchResult.renderResource(resource, agentId)).toMatchSnapshot();
});

it('check searchResult.renderAgent()', () => {
    var agent = {
        name: 'bjstdmngbdr08.thoughtworks.com',
        os: 'windows',
        status: 'building',
        type: 'virtual',
        ip: '192.168.1.80',
        location: '/var/lib/cruise-agent',
        resources: [
            'Firefox',
            'aaaa',
            'r.e.e.r',
            '2',
            '3',
            '4',
            'b',
            'ccc',
            'bbbbbbbbbbb',
            'eeeeeeeeee'
        ],
        id: 2
    };
    var searchResult = new SearchResult();

    expect(searchResult.renderAgent(agent)).toMatchSnapshot();
});

it('check searchResult.render()', () => {
    var agents = [{
        name: 'bjstdmngbdr15.thoughtworks.com',
        os: 'suse',
        status: 'idle',
        type: 'physical',
        ip: '192.168.1.110',
        location: '/var/lib/cruise-agent',
        resources: [
            'a',
            'b',
            'c'
        ],
        id: 5
    }, {
        name: 'bjstdmngbdr02.thoughtworks.com',
        os: 'centos',
        status: 'idle',
        type: 'virtual',
        ip: '192.168.1.103',
        location: '/var/lib/cruise-agent',
        resources: [
            'Safari',
            'Ubuntu',
            'ee',
            'w',
            'r'
        ],
        id: 6
    }];
    var searchResult = new SearchResult();

    expect(searchResult.render(agents)).toMatchSnapshot();
});

// TODO: