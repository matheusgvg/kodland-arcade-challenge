//  Variáveis globais para o item e o inimigo
function spawn_zombie() {
    
    zombie = sprites.create(assets.image`
        zombie
        `, SpriteKind.Enemy)
    zombie.setPosition(20, 20)
    zombie.follow(steve, 40)
}

//  Evento quando o inimigo (zombie) toca no jogador
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite2: Sprite, otherSprite2: Sprite) {
    let musica_derrota: music.Playable;
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    otherSprite2.destroy()
    //  Verifica se perdeu todas as vidas
    if (info.life() <= 0) {
        //  CORREÇÃO: Transforma o asset em Playable e toca até o fim antes de fechar o jogo
        musica_derrota = music.createSong(assets.song`
            lose
            `)
        music.play(musica_derrota, music.PlaybackMode.UntilDone)
        game.over(false)
    } else {
        spawn_zombie()
    }
    
})
function spawn_diamond() {
    
    diamond = sprites.create(assets.image`
        diamond
        `, SpriteKind.Food)
    diamond.setPosition(randint(10, 150), randint(10, 110))
}

//  Evento quando o jogador coleta o diamante
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    let musica_vitoria: music.Playable;
    //  Toca o som padrão de coletar moeda do Arcade
    music.baDing.play()
    otherSprite.destroy()
    info.changeScoreBy(1)
    spawn_diamond()
    //  Condição de vitória (10 pontos)
    if (info.score() >= 10) {
        //  CORREÇÃO: Transforma o asset da música em um objeto tocável (Playable) e roda em loop
        musica_vitoria = music.createSong(assets.song`
            win
            `)
        music.play(musica_vitoria, music.PlaybackMode.UntilDone)
        game.over(true)
    }
    
})
let diamond : Sprite = null
let zombie : Sprite = null
let steve : Sprite = null
//  Criação do Jogador usando o teu asset "player"
steve = sprites.create(assets.image`
    player
    `, SpriteKind.Player)
steve.setStayInScreen(true)
controller.moveSprite(steve, 100, 100)
info.setLife(3)
info.setScore(0)
//  Cria o primeiro diamante
spawn_diamond()
spawn_zombie()
