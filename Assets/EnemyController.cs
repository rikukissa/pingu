using UnityEngine;
using System.Collections;

public class EnemyController : MonoBehaviour {
	public float moveSpeed = 100f;
	private int direction = 1;
	private bool dead = false;

	void FixedUpdate() {
		if (dead) return;
		Vector3 position = transform.position;
		position.x += moveSpeed * direction;
		transform.position = position;
	}
	void OnTriggerEnter2D(Collider2D collider) {
		if (collider.tag == "DirectionChanger") {
			Flip();
		}
	}
	void Flip() {
		direction *= -1;

		Vector3 scale = transform.localScale;
		Vector3 position = transform.position;

		scale.x *= -1;
		position.x += 0.2f * direction;

		transform.position = position;
		transform.localScale = scale;
	}
	public void Die() {
		Destroy (transform.Find("EnemyKillBox").gameObject);
		Destroy (transform.Find("EnemyAttackBox").gameObject);
		rigidbody2D.AddForce (new Vector2(0, 300));
		rigidbody2D.fixedAngle = false;
		rigidbody2D.AddTorque(30);
		dead = true;
	}
}
