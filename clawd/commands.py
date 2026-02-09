def add_account(handle, brand, platform, owner, creator_name):
    # Logic to add account to the database
    # Example: INSERT INTO accounts (handle, brand, platform, owner, creator_name) VALUES (handle, brand, platform, owner, creator_name)
    pass

def submit(handle, posts, views):
    # Logic to submit daily metrics
    # Example: INSERT INTO submissions (account_id, posts, views, date) VALUES (account_id, posts, views, CURRENT_DATE)
    pass

def dashboard(user_id):
    # Logic to retrieve and display dashboard metrics
    # Example: SELECT * FROM submissions WHERE account_id IN (SELECT account_id FROM accounts WHERE owner=user_id)
    pass