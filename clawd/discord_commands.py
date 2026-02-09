import discord
from discord.ext import commands

# Define intents
intents = discord.Intents.default()
intents.messages = True  # Enable message-related events

bot = commands.Bot(command_prefix='/', intents=intents)

# List of brands
BRANDS = ['Genesis', 'AGI Inc', 'PayOut', 'FOMO', 'BetViking']

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')
    print('Commands registered:')
    for command in bot.commands:
        print(f'- {command.name}')  

@bot.command()
async def addaccount(ctx, handle: str, brand: str):
    print('addaccount command executed')
    if brand not in BRANDS:
        await ctx.send('Invalid brand. Please choose from: ' + ', '.join(BRANDS))
        return
    await ctx.send(f'Account {handle} added for brand {brand}.')

@bot.command()
async def submit(ctx, handle: str, posts: int, views: int):
    print('submit command executed')
    await ctx.send(f'Submission received for {handle}: {posts} posts, {views} views.')

@bot.command()
async def myaccounts(ctx):
    print('myaccounts command executed')
    await ctx.send('Here are your accounts: ...')

@bot.command()
async def dashboard(ctx):
    print('dashboard command executed')
    await ctx.send('Here is your dashboard: ...')

@bot.event
async def on_command_error(ctx, error):
    await ctx.send(f'An error occurred: {str(error)}')

bot.run('MTQ2Nzc4NzY5MDg0MDgxNzgyMg.G9RcRE.JEv0lBLEr-0Ym9mGcbEIeBYhg412Hh8fpsjCgQ')