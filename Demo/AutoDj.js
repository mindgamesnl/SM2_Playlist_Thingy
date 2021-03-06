var PlayList_songs = {}; var AutoDj = {}; AutoDj.AddedCount = 1; AutoDj.Volume = 50; AutoDj.IdOfNowPlaying = 1;
AutoDj.AddSong = function (File) {
        PlayList_songs["_" + AutoDj.AddedCount] = {"File": File};
        this.AddedCount++
        PlayList_songs["_" + AutoDj.AddedCount] = "end";
}
AutoDj.SetVolume = function (newvolume) {
        if (newvolume > 100) {
                soundManager.setVolume(100);
                this.Volume = 100;
        } else if (newvolume < 0) {
                soundManager.setVolume(0);
                this.Volume = 100;
        } else {
                soundManager.setVolume(newvolume);
                this.Volume = 100;
        }
}
AutoDj.LoadAll = function () {
        var thiscount = 1;
        while (PlayList_songs["_" + thiscount] != "end") {
                var this_item = PlayList_songs["_" + thiscount]
                AutoDj["SongData_" + thiscount] = { "File": this_item.File, "CanBePlayed": true }
                console.log("AutoDj: Song loaded with ID:" + thiscount)
                thiscount++
        }
        if (PlayList_songs["_" + thiscount] == "end") {
                var loadedcount = thiscount-1
                console.log("AutoDj: Loading done (loaded a total of " + loadedcount + " songs.)")
        }
}
AutoDj.Check = function (song_id) {
        if (AutoDj["SongData_" + song_id] != null) {
                var thisdata = AutoDj["SongData_" + song_id];
                if (thisdata.CanBePlayed === true) {
                        return true;
                } else {
                        return false;
                }
        } else {
               return false;
        }
}
AutoDj.Play = function (FNC_ID) {
      if (this.Check(FNC_ID) === true) {
             var thisdata = AutoDj["SongData_" + FNC_ID];
             this.SoundManager_Play(thisdata.File)
      } else {
             console.log("not playing")
      }
}
AutoDj.SoundManager_Play = function (fnc_file) {
        var VolumeNow = this.Volume;
        soundManager.destroySound('AutoDj');
        var mySoundObject = soundManager.createSound({
            id: "AutoDj",
            url: fnc_file,
            volume: VolumeNow,
            autoPlay: true,
            onfinish: AutoDj.PlayNext
        });
}
AutoDj.PlayNext = function () {
        var VolgendeLiedje = this.IdOfNowPlaying + 1;
        if (AutoDj.Check(VolgendeLiedje) === true) {
                this.Play(VolgendeLiedje);
                this.IdOfNowPlaying++
        } else {
                this.IdOfNowPlaying = 1;
                this.Play(this.IdOfNowPlaying);
        }
}
