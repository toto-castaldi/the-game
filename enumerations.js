const DamageStates = Object.freeze({ "IDLE": 1, "DAMAGE": 2 });
const Directions = Object.freeze({
    "UP": 0, "DOWN": 1, "LEFT": 2, "RIGHT": 3, "randomChange": (dir) => {
        let keys = Object.keys(Directions).slice(0);
        keys = keys.slice(0, keys.length -1);
        let res = dir;
        while (res === dir) {
            res = Directions[choice(keys)];
        }
        return res;
    }
});
