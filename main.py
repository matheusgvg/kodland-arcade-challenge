# Variáveis globais para o item e o inimigo
def spawn_zombie():
    global zombie
    zombie = sprites.create(assets.image("""
        zombie
        """), SpriteKind.enemy)
    zombie.set_position(20, 20)
    zombie.follow(steve, 40)
# Evento quando o inimigo (zombie) toca no jogador

def on_on_overlap(sprite2, otherSprite2):
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
    otherSprite2.destroy()
    # Verifica se perdeu todas as vidas
    if info.life() <= 0:
        # CORREÇÃO: Transforma o asset em Playable e toca até o fim antes de fechar o jogo
        musica_derrota = music.create_song(assets.song("""
            lose
            """))
        music.play(musica_derrota, music.PlaybackMode.UNTIL_DONE)
        game.over(False)
    else:
        spawn_zombie()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def spawn_diamond():
    global diamond
    diamond = sprites.create(assets.image("""
        diamond
        """), SpriteKind.food)
    diamond.set_position(randint(10, 150), randint(10, 110))
# Evento quando o jogador coleta o diamante

def on_on_overlap2(sprite, otherSprite):
    # Toca o som padrão de coletar moeda do Arcade
    music.ba_ding.play()
    otherSprite.destroy()
    info.change_score_by(1)
    spawn_diamond()
    # Condição de vitória (10 pontos)
    if info.score() >= 10:
        # CORREÇÃO: Transforma o asset da música em um objeto tocável (Playable) e roda em loop
        musica_vitoria = music.create_song(assets.song("""
            win
            """))
        music.play(musica_vitoria, music.PlaybackMode.UNTIL_DONE)
        game.over(True)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

diamond: Sprite = None
zombie: Sprite = None
steve: Sprite = None
# Criação do Jogador usando o teu asset "player"
steve = sprites.create(assets.image("""
    player
    """), SpriteKind.player)
steve.set_stay_in_screen(True)
controller.move_sprite(steve, 100, 100)
info.set_life(3)
info.set_score(0)
# Cria o primeiro diamante
spawn_diamond()
spawn_zombie()