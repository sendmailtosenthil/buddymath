/**
 * Created by svaithiyanathan on 1/9/14.
 */
/**
 * Generate random point with in the stage
 * @returns {{x: number, y: number}}
 */
randomPosition = function(stage){
    var stageX = stage.getWidth();
    var stageY = stage.getHeight();
    return {
        x: Math.floor(Math.random() * stageX),
        y: Math.floor(Math.random() * stageY)
    }
}
