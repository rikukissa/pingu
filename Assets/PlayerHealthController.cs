using UnityEngine;
using System.Collections;

public class PlayerHealthController : MonoBehaviour {

	public GUIText livesText;

	private int lives = 3;
	
	void UpdateText() {
		livesText.text = lives.ToString ();
	}

	void Start() {
		UpdateText ();
	}

	void OnTriggerEnter2D(Collider2D collider) {
		if (collider.tag == "Spikes") {
			lives--;
			UpdateText ();
			transform.GetComponent<PlayerController>().BounceUp();
		}
	}
}
