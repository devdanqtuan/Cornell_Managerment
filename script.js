
// --- DATA STORE (MOCK API) ---
const DB = {
    user: {
        netId: 'danggiatuan193',
        name: 'Dang Gia Tuan',
        major: 'Computer Science',
        college: 'College of Engineering',
        gpa: 0.00, // New student
        email: 'danggiatuan193cssu@cornell.edu',
        phone: '+84334477394',
        campusAddress: 'North Campus, Clara Dickson Hall, Rm 304<br>Ithaca, NY 14853',
        homeAddress: 'Yen Hoa, Cau Giay, Ha Noi 123070',
        emergencyContact: {
            name: 'Le Thi Lan Anh',
            relation: 'Parent',
            phone: '+84335547329'
        }
    },
    courses: [
        { id: '1', code: 'CS 2110', name: 'Object-Oriented Prog', instructor: 'Gries, D', days: 'Tue/Thu', time: '10:10 AM - 11:25 AM', location: 'Bailey Hall 101', credits: 4, status: 'Enrolled' },
        { id: '2', code: 'MATH 1920', name: 'Multivariable Calculus', instructor: 'Townsend, A', days: 'Mon/Wed/Fri', time: '09:05 AM - 09:55 AM', location: 'Malott Hall 228', credits: 4, status: 'Enrolled' },
        { id: '3', code: 'PHYS 1112', name: 'Mech & Heat', instructor: 'Liepe, M', days: 'Mon/Wed', time: '12:20 PM - 01:10 PM', location: 'Rockefeller 201', credits: 4, status: 'Enrolled' },
        { id: '5', code: 'INFO 1260', name: 'Choices & Consequences', instructor: 'Barocas, S', days: 'Mon/Wed', time: '02:45 PM - 04:00 PM', location: 'Gates Hall G01', credits: 3, status: 'Enrolled' },
        { id: '6', code: 'STSCI 2150', name: 'Intro Stats for Bio', instructor: 'Booth, J', days: 'Tue/Thu', time: '01:25 PM - 02:40 PM', location: 'Comstock Hall B14', credits: 4, status: 'Enrolled' },
        { id: '7', code: 'PE 1640', name: 'Intro Handgun Safety', instructor: 'Staff', days: 'Fri', time: '10:10 AM - 11:40 AM', location: 'Barton Hall', credits: 1, status: 'Enrolled' },
        { id: '8', code: 'PSYCH 1101', name: 'Intro to Psychology', instructor: 'Pizarro, D', days: 'Mon/Wed/Fri', time: '11:15 AM - 12:05 PM', location: 'Kennedy Hall 116', credits: 3, status: 'Enrolled' }
    ],
    transactions: [
        { id: 101, date: '2026-01-15', description: 'Spring 2026 Tuition', amount: 32000, type: 'charge' },
        { id: 102, date: '2026-01-15', description: 'Student Activity Fee', amount: 150, type: 'charge' },
        { id: 103, date: '2026-01-15', description: 'Health Insurance', amount: 1800, type: 'charge' },
        { id: 104, date: '2026-01-20', description: 'Payment - Wire Transfer', amount: 15930, type: 'payment' },
    ]
};

// --- STATE MANAGEMENT ---
const AppState = {
    currentUser: null,
    currentView: 'home', // home, schedule, grades, finance, profile
    isLoading: false,
    loginError: '',
    showPaymentModal: false
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const getBalance = () => {
    const charges = DB.transactions.filter(t => t.type === 'charge').reduce((acc, t) => acc + t.amount, 0);
    const payments = DB.transactions.filter(t => t.type === 'payment').reduce((acc, t) => acc + t.amount, 0);
    return charges - payments;
};

const calculatePoints = (grade, credits) => {
    if (!grade || grade === 'IP') return '0.00';
    const pointsMap = {
        'A+': 4.3, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0
    };
    const gp = pointsMap[grade] || 0;
    return (gp * credits).toFixed(2);
};

// --- ACTIONS ---
window.handleLogin = async (e) => {
    e.preventDefault();
    const netIdInput = document.getElementById('netid').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    // Specific credentials
    const VALID_USER = 'danggiatuan193cssu@cornell.edu';
    const VALID_PASS = 'Danggtuann0602';

    AppState.isLoading = true;
    AppState.loginError = '';
    render(); // Re-render to show loading state

    // Simulate network request
    setTimeout(() => {
        if (netIdInput === VALID_USER && passwordInput === VALID_PASS) {
            AppState.currentUser = DB.user;
            AppState.isLoading = false;
        } else {
            AppState.loginError = 'Invalid NetID or Password.';
            AppState.isLoading = false;
        }
        render();
    }, 800);
};

window.handleLogout = () => {
    AppState.currentUser = null;
    AppState.currentView = 'home';
    render();
};

window.navigate = (view) => {
    AppState.currentView = view;
    render();
};

window.togglePaymentModal = (show) => {
    AppState.showPaymentModal = show;
    render();
};

window.processPayment = () => {
    alert('This is a demo. Payment simulation successful!');
    AppState.showPaymentModal = false;
    render();
};

// --- VIEW COMPONENTS (Render Functions) ---

const renderLogin = () => `
    <div class="min-h-screen bg-white flex flex-col items-center">
        <!-- Header -->
        <div class="w-full bg-[#B31B1B] h-24 flex items-center justify-center shadow-md">
            <h1 class="text-white text-3xl font-serif tracking-wide font-bold">Cornell University</h1>
        </div>

        <!-- Content -->
        <div class="flex flex-col md:flex-row w-full max-w-5xl mt-10 px-4 gap-8">
            <div class="hidden md:block w-1/2">
                <div class="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative shadow-inner">
                    <img src="https://picsum.photos/800/600?grayscale" class="object-cover w-full h-full opacity-80" alt="Cornell Campus" />
                    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <p class="text-white text-xl font-light tracking-widest uppercase">Student Center</p>
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/2 max-w-md mx-auto">
                <div class="bg-white p-1">
                    <h2 class="text-2xl font-light text-gray-700 mb-2">CUWebLogin</h2>
                    <p class="text-sm text-gray-600 mb-6">Login with your Cornell NetID (NetID@cornell.edu)</p>

                    <form onsubmit="handleLogin(event)" class="space-y-4">
                        ${AppState.loginError ? `
                            <div class="bg-red-50 border-l-4 border-[#B31B1B] p-3 mb-4">
                                <p class="text-red-700 text-sm">${AppState.loginError}</p>
                            </div>
                        ` : ''}

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="netid">NetID</label>
                            <input type="text" id="netid" class="w-full border border-gray-300 p-2 focus:outline-none focus:border-[#B31B1B] transition-colors" placeholder="NetID@cornell.edu">
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">Password</label>
                            <input type="password" id="password" class="w-full border border-gray-300 p-2 focus:outline-none focus:border-[#B31B1B] transition-colors" placeholder="Password">
                        </div>

                        <div class="flex items-center mt-4">
                            <input type="checkbox" id="kmsi" class="mr-2 h-4 w-4 text-[#B31B1B]">
                            <label for="kmsi" class="text-sm text-gray-600">Keep me signed in</label>
                        </div>

                        <button type="submit" ${AppState.isLoading ? 'disabled' : ''} class="mt-6 w-full bg-[#B31B1B] text-white font-bold py-2 px-4 hover:bg-[#9e1515] transition-colors disabled:opacity-50">
                            ${AppState.isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div class="mt-8 text-sm text-gray-500 space-y-2">
                        <p><a href="#" class="text-blue-600 hover:underline">I forgot my password!</a></p>
                        <p><a href="#" class="text-blue-600 hover:underline">I don't have a NetID. Now what?</a></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-auto w-full py-6 text-center text-xs text-gray-500 border-t border-gray-200">
            <p>© 2025 Cornell University</p>
        </div>
    </div>
`;

const renderDashboardHome = () => {
    const courses = DB.courses.slice(0, 3);
    const balance = getBalance();

    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Welcome Card -->
        <div class="bg-white rounded shadow-sm border-t-4 border-[#B31B1B] p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Welcome, ${DB.user.name}</h2>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center"><span class="font-bold mr-1">NetID:</span> ${DB.user.netId}</span>
                <span class="flex items-center"><span class="font-bold mr-1">Major:</span> ${DB.user.major}</span>
                <span class="flex items-center"><span class="font-bold mr-1">College:</span> ${DB.user.college}</span>
            </div>
        </div>

        <!-- Holds -->
        <div class="bg-white rounded shadow-sm p-4">
            <div class="flex justify-between items-center border-b pb-2 mb-3">
                <h3 class="font-bold text-gray-700">Holds & To-Do List</h3>
                <span class="bg-red-100 text-[#B31B1B] text-xs font-bold px-2 py-1 rounded-full">1 Action</span>
            </div>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <div class="bg-yellow-100 text-yellow-800 p-1 rounded mr-3 mt-1">!</div>
                    <div>
                        <p class="text-sm font-medium text-gray-800">Complete Health History</p>
                        <p class="text-xs text-gray-500">Due: Oct 15, 2025</p>
                    </div>
                </li>
                <li class="flex items-start">
                     <div class="bg-green-100 text-green-800 p-1 rounded mr-3 mt-1">✓</div>
                     <div>
                        <p class="text-sm font-medium text-gray-800">Enrollment Complete</p>
                        <p class="text-xs text-gray-500">Spring 2026</p>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Schedule Preview -->
        <div class="bg-white rounded shadow-sm p-4">
            <div class="flex justify-between items-center border-b pb-2 mb-3">
                <h3 class="font-bold text-gray-700">Today's Schedule</h3>
                <span onclick="navigate('schedule')" class="text-xs text-blue-600 cursor-pointer hover:underline">View Week</span>
            </div>
            <div class="space-y-3">
                ${courses.map(c => `
                    <div class="border-l-2 border-blue-500 pl-3">
                        <p class="text-sm font-bold text-gray-800">${c.code}</p>
                        <p class="text-xs text-gray-600">${c.time}</p>
                        <p class="text-xs text-gray-500">${c.location}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Finance Preview -->
        <div class="bg-white rounded shadow-sm p-4">
            <div class="flex justify-between items-center border-b pb-2 mb-3">
                <h3 class="font-bold text-gray-700">Finances</h3>
            </div>
            <div class="text-center py-4">
                <p class="text-gray-500 text-sm mb-1">Total Due</p>
                <p class="text-3xl font-light ${balance > 0 ? 'text-red-600' : 'text-green-600'}">${formatCurrency(balance)}</p>
                ${balance > 0 ? `<button onclick="navigate('finance')" class="mt-4 bg-[#B31B1B] text-white text-xs font-bold py-2 px-6 rounded hover:bg-[#9e1515]">Pay Now</button>` : '<p class="text-xs text-gray-400 mt-2">No payments due.</p>'}
            </div>
        </div>

        <!-- Advisors -->
        <div class="bg-white rounded shadow-sm p-4 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 class="font-bold text-gray-700 border-b pb-2 mb-3">Advisor Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[
                    {name: 'Dr. Emily Chen', role: 'Academic Advisor', email: 'ec33@cornell.edu'},
                    {name: 'Prof. David Gries', role: 'Faculty Advisor', email: 'dg@cornell.edu'},
                    {name: 'Sarah Jones', role: 'Financial Aid', email: 'sj202@cornell.edu'},
                    {name: 'Dr. Robert Morris', role: 'Career Services', email: 'rm99@cornell.edu'},
                    {name: 'Prof. Alice Wu', role: 'Research Mentor', email: 'aw88@cornell.edu'},
                    {name: 'Michael Brown', role: 'Residence Hall Dir.', email: 'mb77@cornell.edu'},
                    {name: 'Lisa Taylor', role: 'International Svc', email: 'lt55@cornell.edu'},
                ].map(advisor => `
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-800">${advisor.name}</p>
                            <p class="text-xs text-gray-500">${advisor.role}</p>
                            <a href="mailto:${advisor.email}" class="text-xs text-blue-600 hover:underline">${advisor.email}</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
};

const renderSchedule = () => `
    <div class="bg-white rounded shadow-sm h-full">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-700">My Class Schedule</h2>
            <div class="flex space-x-2">
                <button class="px-3 py-1 text-xs border rounded hover:bg-gray-50">List View</button>
                <button class="px-3 py-1 text-xs border rounded bg-[#B31B1B] text-white">Weekly Calendar View</button>
            </div>
        </div>

        <div class="p-6">
            <div class="mb-4 flex items-center justify-center space-x-4">
                <button class="text-gray-500 hover:text-black">&lt; Previous Week</button>
                <span class="font-bold text-gray-800">Feb 8 - Feb 14, 2026</span>
                <button class="text-gray-500 hover:text-black">Next Week &gt;</button>
            </div>

            <div class="grid grid-cols-6 border border-gray-200 rounded overflow-hidden text-sm">
                <!-- Headers -->
                ${['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => 
                    `<div class="bg-gray-100 p-2 text-center text-gray-600 font-bold border-r border-b last:border-r-0">${d}</div>`
                ).join('')}

                <!-- Rows (Simplifying grid for raw HTML/JS readability) -->
                
                <!-- 09 AM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">09:00 AM</div>
                <div class="p-1 border-r border-b h-24 relative bg-blue-50">
                    <div class="absolute inset-1 bg-blue-100 border border-blue-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-blue-800">MATH 1920</div><div>Malott Hall</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-blue-50">
                    <div class="absolute inset-1 bg-blue-100 border border-blue-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-blue-800">MATH 1920</div><div>Malott Hall</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-b h-24 relative bg-blue-50">
                    <div class="absolute inset-1 bg-blue-100 border border-blue-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-blue-800">MATH 1920</div><div>Malott Hall</div>
                    </div>
                </div>

                <!-- 10 AM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">10:00 AM</div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-green-50">
                     <div class="absolute inset-1 bg-green-100 border border-green-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-green-800">CS 2110</div><div>Bailey Hall</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-green-50">
                     <div class="absolute inset-1 bg-green-100 border border-green-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-green-800">CS 2110</div><div>Bailey Hall</div>
                    </div>
                </div>
                <div class="p-1 border-b h-24 relative bg-purple-50">
                     <div class="absolute inset-1 bg-purple-100 border border-purple-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-purple-800">PE 1640</div><div>Barton Hall</div>
                    </div>
                </div>

                <!-- 11 AM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">11:00 AM</div>
                <div class="p-1 border-r border-b h-24 relative bg-orange-50">
                     <div class="absolute inset-1 bg-orange-100 border border-orange-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-orange-800">PSYCH 1101</div><div>Kennedy Hall</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-orange-50">
                     <div class="absolute inset-1 bg-orange-100 border border-orange-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-orange-800">PSYCH 1101</div><div>Kennedy Hall</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-b h-24 relative bg-orange-50">
                     <div class="absolute inset-1 bg-orange-100 border border-orange-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-orange-800">PSYCH 1101</div><div>Kennedy Hall</div>
                    </div>
                </div>

                <!-- 12 PM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">12:00 PM</div>
                <div class="p-1 border-r border-b h-24 relative bg-red-50">
                     <div class="absolute inset-1 bg-red-100 border border-red-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-red-800">PHYS 1112</div><div>Rockefeller</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-red-50">
                     <div class="absolute inset-1 bg-red-100 border border-red-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-red-800">PHYS 1112</div><div>Rockefeller</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-b h-24"></div>

                <!-- 1 PM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">01:00 PM</div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-teal-50">
                     <div class="absolute inset-1 bg-teal-100 border border-teal-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-teal-800">STSCI 2150</div><div>Comstock</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-teal-50">
                     <div class="absolute inset-1 bg-teal-100 border border-teal-200 rounded p-1 text-xs overflow-hidden">
                        <div class="font-bold text-teal-800">STSCI 2150</div><div>Comstock</div>
                    </div>
                </div>
                <div class="p-1 border-b h-24"></div>

                 <!-- 2 PM -->
                <div class="p-2 border-r border-b text-xs text-gray-400 text-center h-24">02:00 PM</div>
                <div class="p-1 border-r border-b h-24 relative bg-pink-50">
                     <div class="absolute inset-1 bg-pink-100 border border-pink-200 rounded p-1 text-xs overflow-hidden" style="top: 75%">
                        <div class="font-bold text-pink-800">INFO 1260</div><div>Gates</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-r border-b h-24 relative bg-pink-50">
                     <div class="absolute inset-1 bg-pink-100 border border-pink-200 rounded p-1 text-xs overflow-hidden" style="top: 75%">
                        <div class="font-bold text-pink-800">INFO 1260</div><div>Gates</div>
                    </div>
                </div>
                <div class="p-1 border-r border-b h-24"></div>
                <div class="p-1 border-b h-24"></div>
            </div>
        </div>
    </div>
`;

const renderGrades = () => `
    <div class="bg-white rounded shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h2 class="text-lg font-bold text-gray-700">Grades & Academic Record</h2>
            <div class="text-sm">
                <span class="text-gray-500">Cumulative GPA:</span>
                <span class="font-bold text-[#B31B1B] ml-1">${DB.user.gpa.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="p-6">
            <h3 class="text-md font-semibold text-gray-800 mb-4">Fall 2025</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-100 text-gray-600 uppercase">
                        <tr>
                            <th class="px-4 py-3 text-left">Class</th>
                            <th class="px-4 py-3 text-left">Description</th>
                            <th class="px-4 py-3 text-left">Credits</th>
                            <th class="px-4 py-3 text-left">Grading</th>
                            <th class="px-4 py-3 text-left">Grade</th>
                            <th class="px-4 py-3 text-left">Points</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${DB.courses.map(course => `
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3 font-medium text-blue-800">${course.code}</td>
                                <td class="px-4 py-3 text-gray-800">${course.name}</td>
                                <td class="px-4 py-3 text-gray-600">${course.credits}.00</td>
                                <td class="px-4 py-3 text-gray-600">Letter</td>
                                <td class="px-4 py-3 font-bold text-gray-800">${course.grade || 'IP'}</td>
                                <td class="px-4 py-3 text-gray-600">${calculatePoints(course.grade, course.credits)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
             <div class="mt-8 border-t pt-4">
                <div class="bg-gray-50 p-4 rounded text-center text-gray-500">
                    No completed grades yet (First Term).
                </div>
            </div>
        </div>
    </div>
`;

const renderFinance = () => `
    <div class="bg-white rounded shadow-sm">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-700">Account Inquiry & Payment</h2>
        </div>

        <div class="p-6">
            <!-- Summary -->
            <div class="bg-gray-50 border border-gray-200 rounded p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h3 class="text-gray-500 font-medium uppercase tracking-wide text-xs mb-1">Total Balance Due</h3>
                    <p class="text-3xl font-light text-gray-800">${formatCurrency(getBalance())}</p>
                    <p class="text-sm text-gray-500 mt-1">Due Date: Nov 01, 2025</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <button onclick="togglePaymentModal(true)" class="bg-[#B31B1B] text-white px-6 py-2 rounded font-bold hover:bg-[#9e1515] shadow transition-colors">Make a Payment</button>
                </div>
            </div>

            <!-- Transactions -->
            <h3 class="text-md font-bold text-gray-700 mb-3">Recent Activity</h3>
            <div class="overflow-x-auto border rounded">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-100 text-gray-600">
                        <tr>
                            <th class="px-4 py-3 text-left font-medium">Date</th>
                            <th class="px-4 py-3 text-left font-medium">Description</th>
                            <th class="px-4 py-3 text-right font-medium">Charge</th>
                            <th class="px-4 py-3 text-right font-medium">Payment</th>
                            <th class="px-4 py-3 text-right font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${DB.transactions.map(t => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 text-gray-600">${t.date}</td>
                                <td class="px-4 py-3 text-gray-800 font-medium">${t.description}</td>
                                <td class="px-4 py-3 text-right text-gray-600">${t.type === 'charge' ? formatCurrency(t.amount) : '-'}</td>
                                <td class="px-4 py-3 text-right text-green-600">${t.type === 'payment' ? formatCurrency(t.amount) : '-'}</td>
                                <td class="px-4 py-3 text-right font-bold text-gray-800">${formatCurrency(t.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    ${AppState.showPaymentModal ? `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Make a Payment</h3>
                    <button onclick="togglePaymentModal(false)" class="text-gray-400 hover:text-gray-600">X</button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Payment Amount</label>
                        <input type="number" class="w-full border p-2 rounded outline-none" value="${getBalance()}" readonly>
                    </div>
                    <div>
                         <label class="block text-sm font-bold text-gray-700 mb-1">Payment Method</label>
                         <select class="w-full border p-2 rounded bg-white">
                             <option>eCheck / ACH</option>
                             <option>Credit Card (2.75% fee)</option>
                         </select>
                    </div>
                    <div class="pt-4 flex justify-end space-x-3">
                        <button onclick="togglePaymentModal(false)" class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onclick="processPayment()" class="px-4 py-2 bg-[#B31B1B] text-white rounded font-bold hover:bg-[#9e1515]">Submit Payment</button>
                    </div>
                </div>
            </div>
        </div>
    ` : ''}
`;

const renderProfile = () => `
    <div class="bg-white rounded shadow-sm">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-700">Personal Information</h2>
        </div>
        <div class="p-6">
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                        <img src="https://picsum.photos/200/200" alt="Profile" class="w-full h-full object-cover">
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-gray-800">${DB.user.name}</p>
                        <p class="text-sm text-gray-500">ID: 4432901</p>
                    </div>
                </div>
                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-xs uppercase text-gray-500 font-bold mb-1">Primary Email</label><p class="text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">${DB.user.email}</p></div>
                    <div><label class="block text-xs uppercase text-gray-500 font-bold mb-1">Phone</label><p class="text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">${DB.user.phone}</p></div>
                    <div class="md:col-span-2"><label class="block text-xs uppercase text-gray-500 font-bold mb-1">Campus Address</label><p class="text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">${DB.user.campusAddress}</p></div>
                    <div class="md:col-span-2"><label class="block text-xs uppercase text-gray-500 font-bold mb-1">Home Address</label><p class="text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">${DB.user.homeAddress}</p></div>
                </div>
            </div>
            <div class="mt-8 pt-6 border-t">
                <h3 class="font-bold text-gray-700 mb-4">Emergency Contact</h3>
                <div class="bg-red-50 border border-red-100 rounded p-4 flex items-start">
                    <div class="mr-4 text-red-500 mt-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">${DB.user.emergencyContact.name}</p>
                        <p class="text-sm text-gray-600">Relationship: ${DB.user.emergencyContact.relation}</p>
                        <p class="text-sm text-gray-600">Phone: ${DB.user.emergencyContact.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

// --- MAIN LAYOUT RENDER ---
const renderLayout = (contentHTML) => `
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <header class="bg-[#B31B1B] text-white shadow-md relative z-20">
            <div class="container mx-auto px-4 h-16 flex items-center justify-between">
                <div class="flex items-center space-x-3 cursor-pointer" onclick="navigate('home')">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png" class="w-full h-full object-contain" alt="Logo">
                    </div>
                    <span class="text-xl font-serif font-bold tracking-wide hidden md:block">Student Center</span>
                </div>
                <div class="flex items-center space-x-6 text-sm font-medium">
                     <span class="hidden md:inline text-gray-200">Welcome, ${DB.user.name}</span>
                     <button onclick="handleLogout()" class="hover:text-gray-300 transition-colors">Sign out</button>
                </div>
            </div>
        </header>

        <!-- Nav Tabs -->
        <nav class="bg-[#9e1515] text-white shadow-inner">
            <div class="container mx-auto px-4 overflow-x-auto">
                <div class="flex space-x-1">
                    ${['home', 'schedule', 'grades', 'finance', 'profile'].map(view => `
                        <button onclick="navigate('${view}')" class="px-5 py-3 text-sm font-medium transition-colors border-b-4 focus:outline-none whitespace-nowrap ${AppState.currentView === view ? 'border-white text-white bg-[#8a1212]' : 'border-transparent text-red-100 hover:text-white hover:bg-[#8a1212]'}">
                            ${view.charAt(0).toUpperCase() + view.slice(1).replace('home', 'Dashboard')}
                        </button>
                    `).join('')}
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-grow container mx-auto px-4 py-8 max-w-7xl">
            ${contentHTML}
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-gray-400 py-6 mt-auto">
             <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                 <p>&copy; 2025 Cornell University</p>
                 <div class="flex space-x-4 mt-4 md:mt-0">
                   <a href="#" class="hover:text-white">Privacy</a>
                   <a href="#" class="hover:text-white">Contact</a>
                 </div>
             </div>
        </footer>
    </div>
`;

// --- MAIN RENDER FUNCTION ---
const render = () => {
    const app = document.getElementById('app');
    
    if (!AppState.currentUser) {
        app.innerHTML = renderLogin();
    } else {
        let content = '';
        switch(AppState.currentView) {
            case 'home': content = renderDashboardHome(); break;
            case 'schedule': content = renderSchedule(); break;
            case 'grades': content = renderGrades(); break;
            case 'finance': content = renderFinance(); break;
            case 'profile': content = renderProfile(); break;
        }
        app.innerHTML = renderLayout(content);
    }
};

// --- INITIALIZE ---
render();
