<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SplitWise Clone</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons for UI elements -->
    <script src="https://unpkg.com/lucide-react@0.292.0/dist/lucide-react.js"></script>
    <style>
        /* Custom styles for the application */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc; /* slate-50 */
        }
        /* Custom scrollbar for better aesthetics */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9; /* slate-100 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1; /* slate-300 */
            border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; /* slate-400 */
        }
        /* Style for modal backdrop */
        .modal-backdrop {
            background-color: rgba(0, 0, 0, 0.5);
        }
    </style>
</head>
<body class="text-slate-800">

    <div id="app" class="flex h-screen antialiased">
        <!-- Sidebar for Groups -->
        <aside class="w-1/4 max-w-xs bg-white border-r border-slate-200 flex flex-col">
            <div class="p-4 border-b border-slate-200 flex items-center justify-between">
                <h1 class="text-xl font-bold text-emerald-600">SplitWise</h1>
                <div id="auth-status" class="text-xs text-slate-500">Connecting...</div>
            </div>
            <div class="p-4">
                <button id="createGroupBtn" class="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    New Group
                </button>
            </div>
            <nav id="group-list" class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                <!-- Group list will be populated by JavaScript -->
                <div class="text-center text-slate-500">No groups yet.</div>
            </nav>
            <div class="p-4 border-t border-slate-200 text-xs text-slate-400">
                <p>Your User ID (Share with friends):</p>
                <p id="userIdDisplay" class="font-mono bg-slate-100 p-1 rounded break-all">Loading...</p>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col bg-slate-50">
            <div id="main-content-area" class="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
                <!-- Welcome message or selected group details -->
                <div id="welcome-view" class="h-full flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-slate-300 mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <h2 class="text-2xl font-bold text-slate-700">Welcome to SplitWise</h2>
                    <p class="text-slate-500 mt-2">Select a group to view expenses or create a new one to get started.</p>
                </div>

                <div id="group-view" class="hidden">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 id="group-name-header" class="text-3xl font-bold text-slate-800"></h2>
                            <div id="group-members-header" class="text-sm text-slate-500 mt-1"></div>
                        </div>
                        <button id="addExpenseBtn" class="bg-emerald-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-600 transition-colors flex items-center shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Add Expense
                        </button>
                    </div>

                    <!-- Balances and Expenses Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <!-- Balances Section -->
                        <div class="lg:col-span-1">
                            <h3 class="text-lg font-semibold mb-4 text-slate-600">Group Balances</h3>
                            <div id="balances-list" class="space-y-3">
                                <!-- Balance items will be populated here -->
                                <div class="text-center text-slate-500 p-4 bg-white rounded-lg shadow-sm">No balances to show.</div>
                            </div>
                        </div>
                        <!-- Expenses Section -->
                        <div class="lg:col-span-2">
                            <h3 class="text-lg font-semibold mb-4 text-slate-600">Expenses</h3>
                            <div id="expenses-list" class="space-y-3">
                                <!-- Expense items will be populated here -->
                                <div class="text-center text-slate-500 p-4 bg-white rounded-lg shadow-sm">No expenses yet.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modals -->
    <!-- Create Group Modal -->
    <div id="createGroupModal" class="fixed inset-0 z-50 hidden items-center justify-center modal-backdrop">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all scale-95 opacity-0" id="createGroupModalContent">
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-4">Create a New Group</h3>
                <form id="createGroupForm">
                    <div class="mb-4">
                        <label for="groupName" class="block text-sm font-medium text-slate-700 mb-1">Group Name</label>
                        <input type="text" id="groupName" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-slate-700 mb-1">Members</label>
                        <p class="text-xs text-slate-500 mb-2">Add members by their User ID. Don't forget to add yourself!</p>
                        <div id="groupMembersContainer" class="space-y-2">
                            <!-- Member input fields will be added here -->
                        </div>
                        <button type="button" id="addMemberFieldBtn" class="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            Add Member
                        </button>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancelCreateGroup" class="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
                        <button type="submit" class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors">Create Group</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Add Expense Modal -->
    <div id="addExpenseModal" class="fixed inset-0 z-50 hidden items-center justify-center modal-backdrop">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg m-4 transform transition-all scale-95 opacity-0" id="addExpenseModalContent">
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-4">Add an Expense</h3>
                <form id="addExpenseForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label for="expenseDescription" class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <input type="text" id="expenseDescription" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                        </div>
                        <div>
                            <label for="expenseAmount" class="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                            <input type="number" id="expenseAmount" min="0.01" step="0.01" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="paidBy" class="block text-sm font-medium text-slate-700 mb-1">Paid by</label>
                        <select id="paidBy" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required></select>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-slate-700 mb-1">Split</label>
                        <select id="splitType" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="equally">Equally</option>
                            <option value="exact">By Exact Amounts</option>
                        </select>
                    </div>
                    <div id="splitDetailsContainer" class="mb-6 space-y-2">
                        <!-- Split details will be populated here -->
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancelAddExpense" class="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
                        <button type="submit" class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors">Add Expense</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Custom Alert Modal -->
    <div id="alertModal" class="fixed inset-0 z-[100] hidden items-center justify-center modal-backdrop">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm m-4 p-6 text-center transform transition-all scale-95 opacity-0" id="alertModalContent">
            <h4 id="alertTitle" class="text-xl font-bold mb-2">Alert</h4>
            <p id="alertMessage" class="text-slate-600 mb-6"></p>
            <button id="alertOkBtn" class="bg-emerald-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors">OK</button>
        </div>
    </div>


    <!-- Firebase SDK -->
    <script type="module">
        // Firebase Imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, addDoc, serverTimestamp, query, where } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // --- Firebase Config and Initialization ---
        // These global variables are provided by the environment.
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'splitwise-clone-default';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        let app, auth, db, userId;
        let currentGroupId = null;
        let groupsUnsubscribe = null;
        let expensesUnsubscribe = null;
        let groupMembers = [];

        // --- DOM Elements ---
        const createGroupBtn = document.getElementById('createGroupBtn');
        const createGroupModal = document.getElementById('createGroupModal');
        const createGroupModalContent = document.getElementById('createGroupModalContent');
        const cancelCreateGroup = document.getElementById('cancelCreateGroup');
        const createGroupForm = document.getElementById('createGroupForm');
        const groupList = document.getElementById('group-list');
        const welcomeView = document.getElementById('welcome-view');
        const groupView = document.getElementById('group-view');
        const addExpenseBtn = document.getElementById('addExpenseBtn');
        const addExpenseModal = document.getElementById('addExpenseModal');
        const addExpenseModalContent = document.getElementById('addExpenseModalContent');
        const cancelAddExpense = document.getElementById('cancelAddExpense');
        const addExpenseForm = document.getElementById('addExpenseForm');
        const alertModal = document.getElementById('alertModal');
        const alertModalContent = document.getElementById('alertModalContent');

        // --- Modal Handling ---
        function openModal(modal, content) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeModal(modal, content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 200);
        }

        function showAlert(title, message) {
            document.getElementById('alertTitle').textContent = title;
            document.getElementById('alertMessage').textContent = message;
            openModal(alertModal, alertModalContent);
        }

        document.getElementById('alertOkBtn').addEventListener('click', () => closeModal(alertModal, alertModalContent));

        // --- Application Logic ---
        async function main() {
            try {
                app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);

                document.getElementById('auth-status').textContent = 'Authenticating...';

                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        userId = user.uid;
                        document.getElementById('userIdDisplay').textContent = userId;
                        document.getElementById('auth-status').textContent = 'Online';
                        document.getElementById('auth-status').classList.add('text-emerald-500');
                        listenForGroups();
                    } else {
                        document.getElementById('auth-status').textContent = 'Offline';
                        document.getElementById('auth-status').classList.remove('text-emerald-500');
                    }
                });

                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }

            } catch (error) {
                console.error("Firebase initialization failed:", error);
                showAlert("Initialization Error", "Could not connect to the database. Please refresh the page.");
            }
        }

        // --- Group Management ---
        function listenForGroups() {
            if (groupsUnsubscribe) groupsUnsubscribe();

            const groupsRef = collection(db, `artifacts/${appId}/public/data/groups`);
            const q = query(groupsRef, where("memberIds", "array-contains", userId));

            groupsUnsubscribe = onSnapshot(q, (snapshot) => {
                if (snapshot.empty) {
                    groupList.innerHTML = `<div class="text-center text-slate-500">No groups yet.</div>`;
                    return;
                }

                groupList.innerHTML = '';
                snapshot.forEach(doc => {
                    const group = doc.data();
                    const groupElement = document.createElement('a');
                    groupElement.href = '#';
                    groupElement.className = `block p-3 rounded-lg transition-colors ${doc.id === currentGroupId ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'hover:bg-slate-100'}`;
                    groupElement.dataset.groupId = doc.id;
                    groupElement.innerHTML = `
                        <div class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center font-bold mr-3">${group.name.charAt(0)}</div>
                            <span>${group.name}</span>
                        </div>
                    `;
                    groupElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        selectGroup(doc.id);
                    });
                    groupList.appendChild(groupElement);
                });
            }, (error) => {
                console.error("Error listening for groups:", error);
                showAlert("Error", "Could not fetch your groups.");
            });
        }

        async function selectGroup(groupId) {
            currentGroupId = groupId;

            // Update sidebar UI
            document.querySelectorAll('#group-list a').forEach(el => {
                el.classList.toggle('bg-emerald-100', el.dataset.groupId === groupId);
                el.classList.toggle('text-emerald-800', el.dataset.groupId === groupId);
                el.classList.toggle('font-semibold', el.dataset.groupId === groupId);
            });

            // Fetch group details
            const groupDocRef = doc(db, `artifacts/${appId}/public/data/groups`, groupId);
            const groupSnap = await getDoc(groupDocRef);

            if (groupSnap.exists()) {
                const groupData = groupSnap.data();
                groupMembers = groupData.members; // Store members with id and name

                document.getElementById('group-name-header').textContent = groupData.name;
                const memberNames = groupMembers.map(m => m.name).join(', ');
                document.getElementById('group-members-header').textContent = `Members: ${memberNames}`;

                welcomeView.classList.add('hidden');
                groupView.classList.remove('hidden');

                listenForExpenses();
            } else {
                console.error("Selected group not found");
                showAlert("Error", "The selected group could not be found.");
                currentGroupId = null;
                welcomeView.classList.remove('hidden');
                groupView.classList.add('hidden');
            }
        }

        createGroupBtn.addEventListener('click', () => {
            const container = document.getElementById('groupMembersContainer');
            container.innerHTML = ''; // Clear previous fields
            addMemberField(userId); // Add current user by default
            addMemberField(); // Add one empty field
            openModal(createGroupModal, createGroupModalContent);
        });

        cancelCreateGroup.addEventListener('click', () => closeModal(createGroupModal, createGroupModalContent));

        document.getElementById('addMemberFieldBtn').addEventListener('click', () => addMemberField());

        function addMemberField(value = '') {
            const container = document.getElementById('groupMembersContainer');
            const div = document.createElement('div');
            div.className = 'flex items-center space-x-2';
            div.innerHTML = `
                <input type="text" placeholder="User ID" value="${value}" class="member-id w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                <input type="text" placeholder="Display Name" class="member-name w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                <button type="button" class="remove-member-btn text-slate-400 hover:text-red-500">&times;</button>
            `;
            container.appendChild(div);
            div.querySelector('.remove-member-btn').addEventListener('click', () => div.remove());
        }

        createGroupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const groupName = document.getElementById('groupName').value.trim();
            const memberIdInputs = document.querySelectorAll('.member-id');
            const memberNameInputs = document.querySelectorAll('.member-name');

            const members = [];
            const memberIds = new Set();

            for(let i = 0; i < memberIdInputs.length; i++) {
                const id = memberIdInputs[i].value.trim();
                const name = memberNameInputs[i].value.trim();
                if (id && name && !memberIds.has(id)) {
                    members.push({ id, name });
                    memberIds.add(id);
                }
            }

            if (!groupName || members.length < 2) {
                showAlert("Invalid Input", "Please provide a group name and at least two unique members.");
                return;
            }

            try {
                const groupsRef = collection(db, `artifacts/${appId}/public/data/groups`);
                await addDoc(groupsRef, {
                    name: groupName,
                    members: members,
                    memberIds: Array.from(memberIds),
                    createdAt: serverTimestamp()
                });
                closeModal(createGroupModal, createGroupModalContent);
                createGroupForm.reset();
            } catch (error) {
                console.error("Error creating group:", error);
                showAlert("Error", "Could not create the group. Please try again.");
            }
        });

        // --- Expense Management ---
        addExpenseBtn.addEventListener('click', () => {
            if (!currentGroupId || groupMembers.length === 0) return;

            const paidBySelect = document.getElementById('paidBy');
            paidBySelect.innerHTML = '';
            groupMembers.forEach(member => {
                const option = document.createElement('option');
                option.value = member.id;
                option.textContent = member.name;
                paidBySelect.appendChild(option);
            });

            document.getElementById('splitType').value = 'equally';
            updateSplitDetails();
            openModal(addExpenseModal, addExpenseModalContent);
        });

        cancelAddExpense.addEventListener('click', () => closeModal(addExpenseModal, addExpenseModalContent));

        document.getElementById('splitType').addEventListener('change', updateSplitDetails);
        document.getElementById('expenseAmount').addEventListener('input', updateSplitDetails);

        function updateSplitDetails() {
            const splitType = document.getElementById('splitType').value;
            const container = document.getElementById('splitDetailsContainer');
            const totalAmount = parseFloat(document.getElementById('expenseAmount').value) || 0;
            container.innerHTML = '';

            if (splitType === 'equally') {
                const share = totalAmount > 0 && groupMembers.length > 0 ? (totalAmount / groupMembers.length).toFixed(2) : '0.00';
                container.innerHTML = `<p class="text-sm text-slate-500">Split equally among all ${groupMembers.length} members (${share} each).</p>`;
            } else if (splitType === 'exact') {
                groupMembers.forEach(member => {
                    const div = document.createElement('div');
                    div.className = 'flex items-center justify-between';
                    div.innerHTML = `
                        <label for="split-${member.id}" class="text-sm">${member.name}</label>
                        <input type="number" id="split-${member.id}" data-member-id="${member.id}" class="exact-split-amount w-1/3 px-2 py-1 border border-slate-300 rounded-md text-right" min="0" step="0.01" placeholder="0.00">
                    `;
                    container.appendChild(div);
                });
                container.insertAdjacentHTML('beforeend', `<p id="exact-split-total" class="text-sm text-right mt-2 font-semibold">Total: 0.00 / ${totalAmount.toFixed(2)}</p>`);

                container.querySelectorAll('.exact-split-amount').forEach(input => {
                    input.addEventListener('input', () => {
                        let currentTotal = 0;
                        container.querySelectorAll('.exact-split-amount').forEach(i => {
                            currentTotal += parseFloat(i.value) || 0;
                        });
                        const totalEl = document.getElementById('exact-split-total');
                        totalEl.textContent = `Total: ${currentTotal.toFixed(2)} / ${totalAmount.toFixed(2)}`;
                        totalEl.classList.toggle('text-red-500', currentTotal.toFixed(2) !== totalAmount.toFixed(2));
                    });
                });
            }
        }

        addExpenseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const description = document.getElementById('expenseDescription').value.trim();
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            const paidBy = document.getElementById('paidBy').value;
            const splitType = document.getElementById('splitType').value;

            if (!description || isNaN(amount) || amount <= 0) {
                showAlert("Invalid Input", "Please enter a valid description and amount.");
                return;
            }

            const splits = [];
            if (splitType === 'equally') {
                const share = amount / groupMembers.length;
                groupMembers.forEach(member => {
                    splits.push({ memberId: member.id, amount: share });
                });
            } else if (splitType === 'exact') {
                let totalSplit = 0;
                document.querySelectorAll('.exact-split-amount').forEach(input => {
                    const splitAmount = parseFloat(input.value) || 0;
                    if (splitAmount > 0) {
                        splits.push({ memberId: input.dataset.memberId, amount: splitAmount });
                    }
                    totalSplit += splitAmount;
                });
                if (Math.abs(totalSplit - amount) > 0.01) {
                    showAlert("Invalid Split", "The sum of exact amounts must equal the total expense amount.");
                    return;
                }
            }

            try {
                const expensesRef = collection(db, `artifacts/${appId}/public/data/groups/${currentGroupId}/expenses`);
                await addDoc(expensesRef, {
                    description,
                    amount,
                    paidBy,
                    splitType,
                    splits,
                    createdAt: serverTimestamp()
                });
                closeModal(addExpenseModal, addExpenseModalContent);
                addExpenseForm.reset();
            } catch (error) {
                console.error("Error adding expense:", error);
                showAlert("Error", "Could not add the expense. Please try again.");
            }
        });

        function listenForExpenses() {
            if (expensesUnsubscribe) expensesUnsubscribe();

            const expensesRef = collection(db, `artifacts/${appId}/public/data/groups/${currentGroupId}/expenses`);
            expensesUnsubscribe = onSnapshot(expensesRef, (snapshot) => {
                const expenses = [];
                snapshot.forEach(doc => {
                    expenses.push({ id: doc.id, ...doc.data() });
                });
                // Sort by newest first
                expenses.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
                renderExpenses(expenses);
                calculateAndRenderBalances(expenses);
            }, (error) => {
                console.error("Error listening for expenses:", error);
                showAlert("Error", "Could not fetch expenses for this group.");
            });
        }

        function renderExpenses(expenses) {
            const listEl = document.getElementById('expenses-list');
            if (expenses.length === 0) {
                listEl.innerHTML = `<div class="text-center text-slate-500 p-4 bg-white rounded-lg shadow-sm">No expenses yet.</div>`;
                return;
            }

            listEl.innerHTML = '';
            expenses.forEach(expense => {
                const paidByMember = groupMembers.find(m => m.id === expense.paidBy);
                const date = expense.createdAt ? new Date(expense.createdAt.seconds * 1000).toLocaleDateString() : 'Just now';

                const expenseEl = document.createElement('div');
                expenseEl.className = 'bg-white p-4 rounded-lg shadow-sm flex items-center';
                expenseEl.innerHTML = `
                    <div class="mr-4 text-center">
                        <div class="text-xs text-slate-500">${date.split('/')[0]}/${date.split('/')[1]}</div>
                        <div class="font-bold text-lg">${date.split('/')[2]}</div>
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">${expense.description}</p>
                        <p class="text-sm text-slate-500">${paidByMember ? paidByMember.name : 'Unknown'} paid</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-xl text-slate-700">$${expense.amount.toFixed(2)}</p>
                    </div>
                `;
                listEl.appendChild(expenseEl);
            });
        }

        // --- Balance Calculation ---
        function calculateAndRenderBalances(expenses) {
            const balances = new Map();
            groupMembers.forEach(member => balances.set(member.id, 0));

            expenses.forEach(expense => {
                // Credit the payer
                if (balances.has(expense.paidBy)) {
                    balances.set(expense.paidBy, balances.get(expense.paidBy) + expense.amount);
                }

                // Debit the split members
                expense.splits.forEach(split => {
                    if (balances.has(split.memberId)) {
                        balances.set(split.memberId, balances.get(split.memberId) - split.amount);
                    }
                });
            });

            const simplifiedDebts = simplifyDebts(balances);
            renderBalances(simplifiedDebts);
        }

        function simplifyDebts(balances) {
            const debtors = [];
            const creditors = [];

            balances.forEach((amount, memberId) => {
                if (amount < -0.01) {
                    debtors.push({ memberId, amount });
                } else if (amount > 0.01) {
                    creditors.push({ memberId, amount });
                }
            });

            const debts = [];

            while (debtors.length > 0 && creditors.length > 0) {
                const debtor = debtors[0];
                const creditor = creditors[0];
                const amountToSettle = Math.min(-debtor.amount, creditor.amount);

                debts.push({
                    from: debtor.memberId,
                    to: creditor.memberId,
                    amount: amountToSettle
                });

                debtor.amount += amountToSettle;
                creditor.amount -= amountToSettle;

                if (Math.abs(debtor.amount) < 0.01) {
                    debtors.shift();
                }
                if (Math.abs(creditor.amount) < 0.01) {
                    creditors.shift();
                }
            }
            return debts;
        }

        function renderBalances(debts) {
            const listEl = document.getElementById('balances-list');
            if (debts.length === 0) {
                listEl.innerHTML = `<div class="text-center text-slate-500 p-4 bg-white rounded-lg shadow-sm">Everyone is settled up!</div>`;
                return;
            }

            listEl.innerHTML = '';
            debts.forEach(debt => {
                const fromMember = groupMembers.find(m => m.id === debt.from);
                const toMember = groupMembers.find(m => m.id === debt.to);

                if (!fromMember || !toMember) return;

                const balanceEl = document.createElement('div');
                balanceEl.className = 'bg-white p-3 rounded-lg shadow-sm flex items-center justify-between';
                balanceEl.innerHTML = `
                    <div class="flex items-center">
                         <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold mr-3">${fromMember.name.charAt(0)}</div>
                        <div>
                            <span class="font-semibold">${fromMember.name}</span>
                            <span class="text-sm text-slate-500"> owes </span>
                            <span class="font-semibold">${toMember.name}</span>
                        </div>
                    </div>
                    <div class="font-bold text-red-500">$${debt.amount.toFixed(2)}</div>
                `;
                listEl.appendChild(balanceEl);
            });
        }

        // --- Initialize App ---
        window.onload = main;

    </script>
</body>
</html>
